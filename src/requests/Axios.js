import { decorate, PeerDependency } from '../utils';
import chr from '../chronicle';

const Native = PeerDependency.load('axios');

export default class Axios {
    constructor(chronicle = chr, useContext = null) {
        PeerDependency.check(Native);
        const axios = Native.create({});
        const decorated = decorate(axios, this);

        if (chronicle) {
            decorated._chronicle = chronicle;
            axios.interceptors.request.use(config => Axios.onRequest(config, useContext));
            axios.interceptors.response.use(
                response => Axios.onResponse(response, chronicle, useContext),
                // eslint-disable-next-line promise/prefer-await-to-callbacks
                error => {
                    if (error.isAxiosError) Axios.handleError(error, chronicle, useContext);

                    throw error;
                }
            );
        }

        // eslint-disable-next-line no-constructor-return
        return decorated;
    }

    static onRequest(config, useContext) {
        if (!config.url) {
            return config;
        }

        const currentUrl = new URL(config.url, config.baseURL);
        const context = config.with || useContext;

        if (context) {
            context.rawUrl = new URL(config.url, config.baseURL);
            context.urlParams = config.params;
        }

        for (const [ key, val ] of Object.entries(config.params || {})) {
            currentUrl.pathname = currentUrl.pathname.replace(`:${key}`, encodeURIComponent(val));
        }

        const authPart = currentUrl.username && currentUrl.password ? `${currentUrl.username}:${currentUrl.password}` : '';

        return {
            ...config,
            baseURL : `${currentUrl.protocol}//${authPart}@${currentUrl.host}`,
            url     : currentUrl.pathname
        };
    }

    static handleError(error, chronicle, useContext) {
        const { config, request, response } = error;
        const context = config.with || useContext;

        if (!context) throw error;
        const action = chronicle.action(context);

        action.request = {
            url     : new URL(config.url, config.baseURL),
            headers : config.headers,
            method  : config.method,
            body    : config.data
        };

        action.response = {
            body    : response.data,
            headers : response.header,
            http    : {
                version : request.res.httpVersion
            },
            status : {
                code    : response.status,
                message : response.statusText
            },
            type    : response.type,
            charset : response.charset
        };

        throw error;
    }

    static onResponse(response, chronicle, useContext) {
        const { config, request } = response;
        const context = config.with || useContext;

        if (!context) return response;
        const action = chronicle.action(context);

        action.request = {
            url     : new URL(config.url, config.baseURL),
            headers : config.headers,
            method  : config.method,
            body    : config.data
        };

        action.response = {
            body    : response.data,
            headers : response.header,
            http    : {
                version : request.res.httpVersion
            },
            status : {
                code    : response.status,
                message : response.statusText
            },
            type    : response.type,
            charset : response.charset
        };

        return response;
    }

    with(context) {
        return new Axios(this._chronicle, context);
    }
}
