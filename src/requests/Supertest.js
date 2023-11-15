import { decorate, PeerDependency } from '../utils';
import chr from '../chronicle';

const supertest = PeerDependency.load('supertest');

function fillParams(url, params) {
    let filled = url;

    for (const [ key, value ] of Object.entries(params)) {
        filled = filled.replace(`:${key}`, value);
    }

    return filled;
}

export default class Supertest {
    constructor(app, chronicle = chr) {
        PeerDependency.check(supertest);
        this._chronicle = chronicle;
        this._app = app;
        this._supertest = supertest.agent(this._app);

        // eslint-disable-next-line no-constructor-return
        return this._decorate(this._supertest);
    }

    _decorate(target) {
        for (const key of [ '_with' ]) {
            target[key] = this[key]; // eslint-disable-line no-param-reassign
        }

        return decorate(target, this);
    }

    _setContext(context) {
        this._with = context;
        this._isContextSet = true;
    }

    _process(response) {
        if (!this._isContextSet || !this._with) return;
        const action = this._chronicle.action(this._with);

        this._with = null;
        this._isContextSet = false;

        const { request, res } = response;

        action.request = {
            url     : request.url,
            headers : request.header,
            method  : request.method,
            body    : request._data
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
        this._setContext(params);

        return this._decorate(this._supertest);
    };

    params(params) {
        this._with.urlParams = params;
        this._with.rawUrl = this.url;
        this.url = fillParams(this.url, params);

        return this;
    }

    'before_end' = ({ params }) => {
        // eslint-disable-next-line unicorn/no-this-assignment
        const that = this;

        return [
            function (err, res) {
                params[0](...arguments);
                if (!err) {
                    that._process(res);
                }
            }
        ];
    };

    _proxy = ({ result }) => {
        if (!this._isContextSet && this._chronicle.clsEnabled) {
            const clsContext = this._chronicle.getCLSContext();

            if (clsContext) this._setContext(clsContext);
        }

        return this._decorate(result);
    };

    'after_get'    = this._proxy;

    'after_patch'  = this._proxy;

    'after_post'   = this._proxy;

    'after_delete' = this._proxy;

    'after_expect' = this._proxy;
}
