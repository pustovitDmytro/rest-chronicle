import { URL } from 'url';

function chronicleMiddleware(req, res, next) {
    const action = this._chronicle.action(this);
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
    action.request = {
        url     : new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`),
        headers : req.headers,
        method  : req.method,
        body    : req.body
    };

    res.on('finish', function () {
        const body = Buffer.concat(chunks).toString('utf8');

        action.response = {
            body    : body && JSON.parse(body),
            headers : res.getHeaders(),
            http    : {
                version : res.httpVersion
            },
            status : {
                code    : res.statusCode,
                message : res.statusMessage
            }
        };
        if (this._config?.save) {
            console.log('save');
        }
    });

    next();
}

export default class Express {
    constructor(chronicle, config = {}) {
        this._chronicle = chronicle;
        this._config = config;
        console.log('constructor ', config);

        return this.generateMiddleWare;
    }

    generateMiddleWare = (...args) => {
        return (...expressArgs) => {
            const config = this.getConfig(...args, ...expressArgs);

            chronicleMiddleware.call(config, ...expressArgs);
        };
    }

    getConfig(...args) {
        if (typeof args[0] === 'function') {
            return {
                ...args[0](...args.slice(1)),
                _chronicle : this._chronicle,
                _config    : this._config
            };
        }

        return {
            _chronicle : this._chronicle,
            _config    : this._config,
            group      : args[0],
            title      : args[1]
        };
    }
}
