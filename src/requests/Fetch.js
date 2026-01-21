import { decorate, PeerDependency } from '../utils';
import chr from '../chronicle';
import { isDecorated } from '../constants';

const NativeFetch = PeerDependency.load('node-fetch');

function fillParams(url, params = {}) {
    let filled = url;

    for (const [ key, value ] of Object.entries(params)) {
        filled = filled.replace(`:${key}`, encodeURIComponent(value));
    }

    return filled;
}

export default class Fetch {
    constructor(chronicle = chr, useContext = null) {
        this._chronicle = chronicle;
        this._useContext = useContext;

        const fetchImpl = global.fetch || NativeFetch;

        PeerDependency.check(fetchImpl);

        this._fetch = fetchImpl;

        // eslint-disable-next-line no-constructor-return
        return this._decorate(this.fetch.bind(this));
    }

    _decorate(target) {
        if (target[isDecorated]) return target;

        // eslint-disable-next-line no-param-reassign
        target.with = this.with;

        return decorate(target, this);
    }

    with = (context) => {
        return new Fetch(this._chronicle, context);
    };

    _resolveContext(init) {
        if (init?.with) return init.with;
        if (this._useContext) return this._useContext;

        if (this._chronicle?.clsEnabled) {
            return this._chronicle.getCLSContext();
        }

        return null;
    }

    async fetch(input, init = {}) {
        const context = this._resolveContext(init);

        let url = typeof input === 'string' ? input : input.url;
        const rawUrl = url;

        if (context?.urlParams) {
            url = fillParams(url, context.urlParams);
        }

        if (context) {
            context.rawUrl = rawUrl;
        }

        const requestInit = {
            ...init,
            method  : init.method || 'GET',
            headers : init.headers || {}
        };

        let response;

        try {
            response = await this._fetch(url, requestInit);
        } catch (error) {
            if (context) this._handleError(error, url, requestInit, context);
            throw error;
        }

        if (context) {
            await this._processResponse(response, url, requestInit, context);
        }

        return response;
    }

    async _processResponse(response, url, requestInit, context) {
        const action = this._chronicle.action(context);

        let body;

        try {
            body = await response.clone().json();
        } catch {
            try {
                body = await response.clone().text();
            } catch {
                body = null;
            }
        }

        action.request = {
            url,
            headers : requestInit.headers,
            method  : requestInit.method,
            body    : requestInit.body
        };

        action.response = {
            body,
            // eslint-disable-next-line node/no-unsupported-features/es-builtins
            headers : Object.fromEntries(response.headers.entries()),
            http    : {
                version : '1.1'
            },
            status : {
                code    : response.status,
                message : response.statusText
            },
            type    : response.headers.get('content-type'),
            charset : null
        };
    }

    _handleError(error, url, requestInit, context) {
        try {
            const action = this._chronicle.action(context);

            action.request = {
                url,
                headers : requestInit.headers,
                method  : requestInit.method,
                body    : requestInit.body
            };

            action.response = {
                status : {
                    code    : 0,
                    message : error.message
                }
            };
        } catch (err) {
            console.error(err);
        }
    }
}
