import axios from 'axios';
import { decorate, lastItem, isObject } from '../utils';

export default class Axios {
    constructor(chronicle) {
        this._chronicle = chronicle;

        return this._decorate(axios);
    }

    _decorate(target) {
        return decorate(target, this);
    }

    _process(response, context) {
        if (!context) return;
        const { title, group } = context;
        const { config, request } = response;

        const action = this._chronicle.action(title, group);

        action.request = {
            url     : config.url,
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
    }

    'before_default'({ params }) {
        const config = lastItem(params);

        if (isObject(config)) {
            const { with: _with, ...axiosConfig } = config; // eslint-disable-line no-unused-vars

            return [ ...params.slice(0, -1), axiosConfig ];
        }

        return params;
    }

    'after_default' = ({ rawParams, result }) => {
        const config = lastItem(rawParams);

        if (isObject(config)) {
            this._process(result, config.with);
        }

        return result;
    }

    'after_get'(params, result) {
        console.log('after_get: ', result);

        return this._decorate(result);
    }

    'after_post'(params, result) {
        console.log('after_post: ', params, result);

        return this._decorate(result);
    }
}
