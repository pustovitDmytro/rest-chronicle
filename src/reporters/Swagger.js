import { inspect } from 'util';
import fs from 'fs-extra';
import dP from 'dot-prop';
import { DEFAULT_JSON_OFFSET } from '../constants';
import { detectType } from './utils';
import Base from './Base';

function isJSON(value) {
    if (typeof value !== 'string') return false;
    if (!value.trim().startsWith('{') && !value.trim().startsWith('[')) return false;

    try {
        JSON.parse(value);

        return true;
    } catch {
        return false;
    }
}

export default class SwaggerReporter extends Base {
    constructor(file, { hash } = {}) {
        super(file);
        if (hash) this.getHash = hash;
    }

    mergeArray = true;

    _renderHeaders(headers) {
        if (!headers) return [];

        return Object.entries(headers)
            .filter(([ name ]) => name.toLowerCase() !== 'content-type')
            .map(([ name, value ]) => ({
                name,
                in      : 'header',
                schema  : { type: detectType(value) },
                example : value
            }));
    }

    _renderBody(body) {
        if (isJSON(body)) {
            return this._renderBody(JSON.parse(body));
        }


        if (body === null) {
            return {
                type     : 'null',
                nullable : true,
                example  : null
            };
        }


        if (Buffer.isBuffer(body)) {
            return {
                type    : 'string',
                format  : 'binary',
                example : inspect(body)
            };
        }


        if (Array.isArray(body)) {
            return {
                type  : 'array',
                items : body.length > 0
                    ? this._renderBody(body[0])
                    : {},
                example : body
            };
        }

        const type = detectType(body);


        if (type === 'object') {
            const properties = {};

            for (const [ key, value ] of Object.entries(body)) {
                properties[key] = this._renderBody(value);
            }

            return {
                type    : 'object',
                properties,
                example : body
            };
        }


        const schema = {
            type,
            example : body
        };


        if (type === 'number' && body >= 0 && body <= 1) {
            schema.minimum = 0;
            schema.maximum = 1;
        }

        return schema;
    }

    _renderAction({
        context : { group, title },
        request,
        response
    }) {
        return {
            tags        : [ group || 'default' ],
            description : title,
            parameters  : [
                ...this._renderHeaders(request.headers)
            ],
            requestBody : request.body ? {
                content : {
                    [request.info.type] : {
                        schema : this._renderBody(request.body)
                    }
                }
            } : undefined,
            responses : {
                [response.status.code] : {
                    description : title,
                    content     : {
                        [response.info.type] : {
                            schema : this._renderBody(response.body)
                        }
                    }
                }
            }
        };
    }

    _generate(groups, map, actions) {
        const paths = {};
        const origins = [ ...new Set(actions?.map(a => a.request.origin)) ];

        for (const [ path, methods ] of Object.entries(groups)) {
            for (const [ method, actionIds ] of Object.entries(methods)) {
                const methodName = method.toLowerCase();

                for (const id of actionIds) {
                    const action = map.get(id);
                    const hash = dP.get(paths, `${path}.${methodName}`)
                        ? `#${this.getHash(action)}`
                        : '';

                    dP.set(
                        paths,
                        `${path}${hash}.${methodName}`,
                        this._renderAction(action)
                    );
                }
            }
        }

        const content = {
            openapi : '3.0.0',
            info    : {
                version : '1.0.0',
                title   : 'Swagger Report'
            },
            servers : origins.map(url => ({ url })),
            paths
        };

        return JSON.stringify(content, null, DEFAULT_JSON_OFFSET);
    }

    async write(actions) {
        const { groups, map } = this._build(actions, {
            groupBy : [ 'request.path', 'request.method' ]
        });

        const content = this._generate(groups, map, actions);

        await fs.writeFile(this.file, content);
    }
}
