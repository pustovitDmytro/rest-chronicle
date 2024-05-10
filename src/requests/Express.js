import { URL } from 'url';
import { isArray, isFunction, getProp } from 'myrmidon';
import chr from '../chronicle';


function arrayKeyFilter(keys) {
    return function (action, actions) {
        const dublicate = actions.find(a =>
            keys.every(key => getProp(action, key) === getProp(a, key))
            && a._id !== action._id);

        return !dublicate;
    };
}

function parseContentTypeHeader(header) {
    const [ type, charset ] = header.split('charset=');

    return {
        type : type.split(';')[0],
        charset
    };
}

/* eslint-disable no-param-reassign */
// eslint-disable-next-line sonarjs/cognitive-complexity
function chronicleMiddleware(req, res, next) {
    const action = this.chronicle.action(this.context);
    const originalWrite = res.write;
    const originalEnd = res.end;
    const chunks = [];

    res.write = function (chunk) {
        chunks.push(chunk);
        originalWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
        if (chunk) {
            chunks.push(chunk);
        }

        originalEnd.apply(res, arguments);
    };

    const url = new URL(req.originalUrl, `${req.protocol}://${req.get('host')}`);

    if (req.route) {
        url.pathname = req.route.path;
    }

    action.request = {
        url,
        headers : req.headers,
        method  : req.method,
        body    : req._body ? req.body : null
    };
    res.on('finish',  () => {
        const body = Buffer.concat(chunks).toString('utf8');

        let parsedBody = body;
        const responseInfo = parseContentTypeHeader(res.getHeader('Content-Type'));

        if (body && responseInfo.type === 'application/json') {
            parsedBody = JSON.parse(body);
        }

        if (body && responseInfo.type === 'mimetype') {
            parsedBody = Buffer.from(body);
        }

        action.response = {
            body    : parsedBody,
            headers : res.getHeaders(),
            http    : {
                version : res.httpVersion
            },
            status : {
                code    : res.statusCode,
                message : res.statusMessage
            },
            ...responseInfo
        };
        const save = this.config?.save;

        if (save) {
            const actions = this.chronicle._actions;

            if (isFunction(save)) {
                save(action, actions, this.chronicle, this.config);
            } else {
                let isApproved = true;

                if (save.uniqueFilter) {
                    if (isFunction(save.uniqueFilter)) isApproved = save.uniqueFilter(action, actions);
                    if (isArray(save.uniqueFilter)) isApproved = arrayKeyFilter(save.uniqueFilter)(action, actions);
                }

                if (!isApproved) return;
                const { server } = req.socket;

                if (!server._chronicles) server._chronicles = [];
                const promises = Promise.all(save.files.map(({ path, ...opts }) => this.chronicle.save(path, opts)));

                server._chronicles.push(promises);
            }
        }
    });

    next();
}

export default class Express {
    constructor(chronicle = chr, config = {}) {
        this._chronicle = chronicle;
        this._config = config;

        // eslint-disable-next-line no-constructor-return
        return this.generateMiddleWare;
    }

    generateMiddleWare = (...args) => {
        return (...expressArgs) => {
            const context = this.getContext(...args, ...expressArgs);

            chronicleMiddleware.call({
                context,
                chronicle : this._chronicle,
                config    : this._config
            }, ...expressArgs);
        };
    };

    getContext(...args) {
        if (typeof args[0] === 'function') {
            return {
                ...args[0](...args.slice(1))
            };
        }

        return {
            group : args[0],
            title : args[1]
        };
    }
}
