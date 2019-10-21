import supertest from 'supertest';
import { decorate } from '../utils';

function fillParams(url, params) {
    let filled = url;

    Object.entries(params).forEach(([ key, value ]) => {
        filled = filled.replace(`:${key}`, value);
    });

    return filled;
}

export default class Supertest {
    constructor(app, chronicle) {
        this._chronicle = chronicle;
        this._app = app;

        return this._decorate(supertest(this._app));
    }

    _decorate(target) {
        [ '_with' ].forEach(key => {
            target[key] = this[key]; // eslint-disable-line no-param-reassign
        });

        return decorate(target, this);
    }

    _process(response) {
        if (!this._with) return;
        const action = this._chronicle.action(this._with);

        this._with = null;
        const { request, res } = response;

        action.request = {
            url     : request.url,
            headers : request.header,
            method  : request.method
        };

        action.response = {
            body    : response.body,
            headers : response.header,
            http    : {
                version : res.httpVersion
            },
            status : {
                code    : response.statusCode,
                message : res.statusMessage
            },
            type    : response.type,
            charset : response.charset
        };
    }

    with = (params) => {
        this._with = params;

        return this._decorate(supertest(this._app));
    }

    params(params) {
        this._with.urlParams = params;
        this._with.rawUrl = this.url;
        this.url = fillParams(this.url, params);

        return this;
    }

    'before_end' = ({ params }) => {
        const that = this;

        return [
            function (err, res) {
                params[0](...arguments);
                if (!err) {
                    that._process(res);
                }
            }
        ];
    }

    _proxy = ({ result }) => {
        return this._decorate(result);
    }

    'after_get'    = this._proxy;
    'after_patch'  = this._proxy;
    'after_post'   = this._proxy;
    'after_delete' = this._proxy;
    'after_expect' = this._proxy;
}
