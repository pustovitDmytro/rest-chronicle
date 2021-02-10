import fs from 'fs-extra';
import dP from 'dot-prop';
import { isArray } from 'myrmidon';

function findGroup(obj, filters, id, index = 0) {
    if (index === filters.length) {
        if (isArray(obj)) return [ ...obj, id ];

        return [ id ];
    }
    obj[filters[index]] = findGroup(  // eslint-disable-line no-param-reassign
        obj[filters[index]] || {},
        filters,
        id,
        index + 1
    );

    return obj;
}

function detectType(value) {
    return typeof value;
}

export default class SwaggerReporter {
    constructor(file, { hash } = {}) {
        this.file = file;
        if (hash) this.getHash = hash;
    }
    _init() {

    }
    _build(actions, { groupBy = [] } = {}) {
        const map = new Map();
        const groups = {};

        actions.forEach(a => {
            const groupValues = groupBy.map(key => dP.get(a, key));

            findGroup(groups, groupValues, a.id);
            map.set(a.id, a);
        });

        return { groups, map };
    }

    _renderHeaders(headers) {
        return Object.entries(headers)
            .map(([ name, value ]) => ({
                name,
                in       : 'header',
                'schema' : { type: detectType(value) },
                example  : value
            }));
    }

    _renderBody(body) {
        const result = {
            type    : detectType(body),
            example : body
        };

        if (body === null) result.nullable = true;

        if (body && result.type === 'object') {
            Object.entries(body)
                .forEach(([ key, value ]) => {
                    dP.set(result, `properties.${key}`, this._renderBody(value));
                });
        }

        return result;
    }

    _renderAction({
        context:{ group, title },
        request,
        response
    }) {
        return {
            tags        : [ group ],
            description : title,
            parameters  : [
                ...this._renderHeaders(request.headers)
            ],
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
        const origins = [ ...new Set(actions.map(a => a.request.origin)) ];

        Object.entries(groups)
            .forEach(([ path, methods ]) => {
                Object.entries(methods)
                    .forEach(([ method, actionIds ]) => {
                        const methodName = method.toLowerCase();

                        actionIds.forEach(id => {
                            const action = map.get(id);
                            const hash = dP.get(paths, `${path}.${methodName}`)
                                ? `#${this.getHash(action)}`
                                : '';

                            dP.set(paths, `${path}${hash}.${methodName}`, this._renderAction(action));
                        });
                    });
            });

        const content = {
            openapi : '3.0.0',
            info    : {
                version : '1.0.0',
                title   : 'Swagger Report'
            },
            servers : origins.map(url => ({ url })),
            paths
        };

        return JSON.stringify(content, null, 4);
    }

    getHash(action) {
        return action.id;
    }

    async write(actions) {
        const { groups, map } = this._build(actions, { groupBy: [ 'request.path', 'request.method' ] });
        const content = this._generate(groups, map, actions);

        await fs.writeFile(this.file, content);
    }
}
