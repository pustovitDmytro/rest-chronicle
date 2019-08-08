import { URL } from 'url';
import uuid from 'uuid';
import { HTTP_STATUS_CODES } from '../constants';

function getQuery(searchParams) {
    const query = {};

    searchParams.forEach((value, name) => {
        query[name] = value;
    });

    return query;
}

export default class Action {
    constructor({ title, group, chronicle, id, ...values }) {
        this._context = { title, group };
        this._response = {};
        this._request = {};
        this.set(values);
        chronicle._actions.push(this);
        this._id = id || uuid.v4();
    }

    set(values = {}) {
        Object.entries(values)
            .filter(([ , value ]) => value !== undefined)
            // .filter(([ key ]) => value !== undefined)
            .forEach(([ key, value ]) => {
                this[key] = value;
            });
    }

    set request({ headers, body, ...values }) {
        this.set(values);
        this.set({
            reqHeaders : headers,
            reqBody    : body
        });
    }

    set response({ headers, body, ...values }) {
        this.set(values);
        this.set({
            resHeaders : headers,
            resBody    : body
        });
    }

    set url(value) {
        this._request.url = new URL(value);
    }

    set method(value) {
        this._request._method = value;
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

    set status(code) {
        this._response.code = code;
    }

    get context() {
        return this._context;
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
        return this._request.headers || {};
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
        return this._response.body;
    }

    get status() {
        const statusCode = this._response.code || 200;

        return {
            code    : statusCode,
            message : HTTP_STATUS_CODES[statusCode]
        };
    }

    get resHeaders() {
        return this._response.headers || {};
    }

    get resContentInfo() {
        // TODO parse from headers
        const { info } = this._response;

        return {
            type    : info?.type || 'application/json',
            charset : info?.charset || 'utf-8'
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
}
