import Native from 'axios';
import { decorate } from '../utils';

export default class Axios {
    constructor(chronicle, useContext) {
        const axios = Native.create({});
        const decorated = decorate(axios, this);

        if (chronicle) {
            decorated._chronicle = chronicle;
            axios.interceptors.request.use((config) => {
                if (!config.url) {
                    return config;
                }

                const currentUrl = new URL(config.url, config.baseURL);
                const context = config.with || useContext;

                if (context) {
                    context.rawUrl = new URL(config.url, config.baseURL);
                    context.urlParams = config.params;
                }

                Object.entries(config.params || {}).forEach(([ key, val ]) => {
                    currentUrl.pathname = currentUrl.pathname.replace(`:${key}`, encodeURIComponent(val));
                });

                const authPart = currentUrl.username && currentUrl.password ? `${currentUrl.username}:${currentUrl.password}` : '';

                return {
                    ...config,
                    baseURL : `${currentUrl.protocol}//${authPart}@${currentUrl.host}`,
                    url     : currentUrl.pathname
                };
            });
            axios.interceptors.response.use(
                response => Axios.onResponse(response, chronicle, useContext),
                error => {
                    if (error.isAxiosError) {
                        Axios.handleError(error, chronicle, useContext);
                    }

                    throw error;
                }
            );
        }

        // eslint-disable-next-line no-constructor-return
        return decorated;
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
