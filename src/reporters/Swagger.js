import fs from 'fs-extra';
import dP from 'dot-prop';
import { DEFAULT_JSON_OFFSET } from '../constants';
import { detectType } from './utils';
import Base from './Base';

export default class SwaggerReporter extends Base {
    constructor(file, { hash } = {}) {
        super(file);
        if (hash) this.getHash = hash;
    }

    mergeArray = true;

    _renderHeaders(headers) {
        if (!headers) return [];

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
            for (const [ key, value ] of Object.entries(body)) {
                dP.set(result, `properties.${key}`, this._renderBody(value));
            }
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

        for (const [ path, methods ] of Object.entries(groups)) {
            for (const [ method, actionIds ] of Object.entries(methods)) {
                const methodName = method.toLowerCase();

                for (const id of actionIds) {
                    const action = map.get(id);
                    const hash = dP.get(paths, `${path}.${methodName}`)
                        ? `#${this.getHash(action)}`
                        : '';

                    dP.set(paths, `${path}${hash}.${methodName}`, this._renderAction(action));
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
        const { groups, map } = this._build(actions, { groupBy: [ 'request.path', 'request.method' ] });
        const content = this._generate(groups, map, actions);

        await fs.writeFile(this.file, content);
    }
}
