import { URL } from 'url';
import { v4 as uuid } from 'uuid';
import { isEmpty, toArray } from 'myrmidon';
import { HTTP_STATUS_CODES, DEFAULT_STATUS_CODE } from '../constants';

function getQuery(searchParams) {
    const query = {};

    for (const [ name, value ] of searchParams.entries()) {
        if (query[name]) {
            query[name] = [ ...toArray(query[name]), value ];
        } else {
            query[name] = value;
        }
    }

    return query;
}

export default class Action {
    constructor({ chronicle, id, _id, _chronicle, ...values }) {
        this._context = {};
        this._response = {};
        this._request = {};
        this._chronicle = chronicle || _chronicle;
        this.set(values);
        this._id = id || _id || uuid();
        this._chronicle._actions.push(this);
    }

    copy(chronicle) {
        return new Action({
            context  : this.context,
            request  : this.request,
            response : this.response,
            chronicle
        });
    }

    static sanitizeHeaders(headers, config) {
        if (!config || !headers) return headers || null;
        const sanitized = {};

        if (typeof config.sanitize === 'function') {
            return config.sanitize(headers);
        }

        for (const key of Object.keys(headers)) {
            const value = headers[key];
            const sanitizer = config.sanitize?.[key];

            if (config.include && !config.include.includes(key)) continue;
            if (config.exclude && config.exclude.includes(key)) continue;

            if (typeof sanitizer === 'function') {
                sanitized[key] = sanitizer(value, headers);
            } else {
                sanitized[key] = value;
            }
        }

        return isEmpty(sanitized) ? null : sanitized;
    }

    set(values = {}) {
        const filtered = Object.entries(values)
            .filter(([ , value ]) => value !== undefined);

        for (const [ key, value ] of filtered) { // TODO: check for setter
            this[key] = value;
        }
    }

    set context(context) {
        const { urlParams, rawUrl } = context;

        this._context = this._chronicle.contextBuilder(context);
        if (urlParams) this._context.urlParams = urlParams;
        if (rawUrl) this._context.rawUrl = rawUrl;
    }

    set request({ headers, body, ...values }) {
        this.set(values);
        this.set({
            reqHeaders : headers,
            reqBody    : body
        });
    }

    set response({ headers, body, http, status, charset, type }) {
        this.set({
            http,
            status,
            info : {
                charset,
                type
            },
            resHeaders : headers,
            resBody    : body
        });
    }

    set url(value) {
        const { rawUrl } = this._context;
        const url = rawUrl || value;

        this._request.url = new URL(url);
    }

    set method(value) {
        this._request._method = value.toUpperCase();
    }

    set reqHeaders(headers) {
        this._request.headers = headers;
    }

    set reqBody(body) {
        this._request.body = body;
    }

    set resHeaders(values) {
        this._response.headers = values;
    }

    set resBody(values) {
        this._response.body = values;
    }

    set httpVersion(version) {
        this._response.httpVersion = version;
    }

    set status({ code }) {
        this._response.code = code;
    }

    get context() {
        return this._context;
    }

    get title() {
        return this._context.title;
    }

    get group() {
        return this._context.group;
    }

    get url() {
        if (!this._request.url) return null;

        return {
            href     : this._request.url.href,
            origin   : this._request.url.origin,
            protocol : this._request.url.protocol,
            hostname : this._request.url.hostname,
            port     : this._request.url.port,
            path     : this._request.url.pathname,
            query    : getQuery(this._request.url.searchParams)
        };
    }

    get method() {
        return this._request._method || 'GET';
    }

    get reqHeaders() {
        return Action.sanitizeHeaders(this._request.headers, this._chronicle.config.headers?.request);
    }

    get reqBody() {
        return this._request.body;
    }

    get request() {
        const url = this.url;

        if (!url) return null;
        const request = {
            ...url,
            method  : this.method,
            headers : this.reqHeaders
        };

        const reqBody = this.reqBody;

        if (reqBody) {
            request.body = reqBody;
        }

        return request;
    }

    get resBody() {
        if (Buffer.isBuffer(this._response.body)) return Buffer.from('BINARY DATA');

        return this._response.body;
    }

    get status() {
        const statusCode = this._response.code || DEFAULT_STATUS_CODE;

        return {
            code    : statusCode,
            message : HTTP_STATUS_CODES[statusCode]
        };
    }

    get resHeaders() {
        return Action.sanitizeHeaders(this._response.headers, this._chronicle.config.headers?.response);
    }

    get resContentInfo() {
        return {
            type    : this.info?.type || 'application/json',
            // eslint-disable-next-line unicorn/text-encoding-identifier-case
            charset : this.info?.charset || 'utf-8'
        };
    }

    get httpVersion() {
        return this._response.httpVersion || '1.1';
    }

    get response() {
        return {
            status  : this.status,
            body    : this.resBody,
            headers : this.resHeaders,
            info    : this.resContentInfo,
            http    : {
                version : this.httpVersion
            }
        };
    }

    get data() {
        const request = this.request;
        const response = this.response;
        const context = this.context;

        if (!request || !response || !context) return null;

        return {
            id : this._id,
            context,
            request,
            response
        };
    }

    toJSON() {
        return this.data;
    }
}
