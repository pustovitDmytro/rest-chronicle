import Native from 'axios';
import { decorate } from '../utils';

export default class Axios {
    constructor(chronicle) {
        const axios = Native.create({});

        if (chronicle) {
            axios.interceptors.request.use((config) => {
                if (!config.url) {
                    return config;
                }

                const currentUrl = new URL(config.url, config.baseURL);

                Object.entries(config.params || {}).forEach(([ key, val ]) => {
                    currentUrl.pathname = currentUrl.pathname.replace(`:${key}`, encodeURIComponent(val));
                });

                const authPart = currentUrl.username && currentUrl.password ? `${currentUrl.username}:${currentUrl.password}` : '';

                return {
                    ...config,
                    baseURL : `${currentUrl.protocol}//${authPart}${currentUrl.host}`,
                    url     : currentUrl.pathname
                };
            });

            axios.interceptors.response.use(response => {
                const { config, request } = response;
                const context = config.with;

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
            }, (error) => {
                throw error;
            });
        }

        return decorate(axios, this);
    }

    _decorate(target) {
        return decorate(target, this);
    }

    with(context) {
        this._with = context;

        return this;
    }
}
