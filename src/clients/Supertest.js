import supertest from 'supertest';
import Test from 'supertest/lib/test';
import { getMethodNames, isPromise, isFunction, inject } from '../utils';

// function isTest(x) {
//     return x && x instanceof Test;
// }

// function onSuccess({
//     params,
//     result,
//     method,
//     context,
//     chronicle
// }) {
//     return result;
// }

// function onError({
//     params,
//     error,
//     method,
//     context,
//     chronicle
// }) {
//     throw error;
// }

export default class Supertest {
    constructor(app, chronicle) {
        this._chronicle = chronicle;
        this._app = app;

        return this._decorate(supertest(this._app));
    }
    _decorate(target) {
        return inject(this, target);
        // return decorate(target, {
        //     onError,
        //     onSuccess : this._onSuccess
        // });
    }

    with(params) {
        console.log('with params: ', params);

        return this._decorate(supertest(this._app));
    }

    get(params, result) {
        console.log('get params: ', params);

        return this._decorate(result);
    }

    expect(params, result) {
        console.log('expect params: ', params);

        return this._decorate(result);
    }
}
