import supertest from 'supertest';
import Test from 'supertest/lib/test';
import { getMethodNames, isPromise, isFunction, inject } from '../utils';

export default class Supertest {
    constructor(app, chronicle) {
        this._chronicle = chronicle;
        this._app = app;

        return this._decorate(supertest(this._app));
    }
    _decorate(target) {
        return inject(this, target);
    }
    _process(response) {
        if (this._action || !this._with) return;
        const { title, group } = this._with;
        const { request, res } = response;

        this._action = this._chronicle.action(title, group);
        this._action.request = {
            url     : request.url,
            headers : request.header,
            method  : request.method
        };
        this._action.response = {
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

    with([ params ]) {
        this._with = params;

        return this._decorate(supertest(this._app)); // TODO change to context
    }

    'before_end'(params) {
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

    'after_get'(params, result) {
        return this._decorate(result);
    }

    'after_expect'(params, result) {
        return this._decorate(result);
    }
}
