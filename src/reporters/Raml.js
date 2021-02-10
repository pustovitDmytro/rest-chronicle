import fs from 'fs-extra';
import dP from 'dot-prop';
import { isArray, isObject, flatten, isEmpty } from 'myrmidon';
import yaml from 'js-yaml';

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
    if (value === null) return 'nil';

    return typeof value;
}

function dictionary(obj, prefix = []) {
    return flatten(Object.entries(obj)
        .map(([ key, value ]) => {
            if (isObject(value)) return dictionary(value, [ ...prefix, key ]);

            return { key: [ ...prefix, key ], value };
        })
    );
}

export default class RamlReporter {
    constructor(file, { hash } = {}) {
        this.file = file;
        if (hash) this.getHash = hash;
    }
    _init() {}
    _build(actions) {
        const map = new Map();
        const groups = {};

        actions.forEach(a => {
            const { path, method } = a.request;

            const resources = path.split('/').filter(i => i).map(i => `/${i}`);

            const groupValues = [ ...resources, method.toLowerCase() ];

            findGroup(groups, groupValues, a.id);
            map.set(a.id, a);
        });

        return { groups, map };
    }

    _renderHeaders(headers) {
        return Object.entries(headers)
            .reduce((prev, [ name, value ]) => ({
                ...prev,
                [name] : {
                    example : value,
                    type    : detectType(value)
                }
            }), {});
    }

    _renderBody(body) {
        const result = {
            type    : detectType(body),
            example : isEmpty(body) ? body : JSON.stringify(body, null, 4)
        };

        if (body && result.type === 'object') {
            Object.entries(body)
                .forEach(([ key, value ]) => {
                    dP.set(result, `properties.${key}`, {
                        type : detectType(value)
                    });
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
            '(group)'   : group,
            description : title,
            headers     : this._renderHeaders(request.headers),
            responses   : {
                [response.status.code] : {
                    body : {
                        [response.info.type] : this._renderBody(response.body)
                    }
                }
            }
        };
    }
    _generate(groups, map, actions) {
        const dict = dictionary(groups);
        const hashed = [];

        dict.forEach(item => {
            if (item.value.length === 1) return hashed.push({ key: item.key, value: item.value[0] });
            const [ original, ...dublicates ] = item.value;

            hashed.push({ key: item.key, value: original });
            dublicates.forEach(actionId => {
                const action = map.get(actionId);
                const hash = this.getHash(action);
                const [ method, lastPath, ...pathRev ] = [ ...item.key ].reverse();

                hashed.push({
                    key   : [ ...pathRev.reverse(), `${lastPath}#${hash}`, method ],
                    value : actionId
                });
            });
        });

        const paths = {};
        const origins = [ ...new Set(actions.map(a => a.request.origin)) ];

        hashed.forEach(item => {
            const action = map.get(item.value);

            dP.set(paths, item.key.join('.'), this._renderAction(action));
        });

        const content = {
            title           : 'Raml report',
            baseUri         : origins[0],
            version         : '1.0.0',
            annotationTypes : { group: 'string' },
            ...paths
        };

        return `#%RAML 1.0\n${yaml.dump(content)}`;
    }

    getHash(action) {
        return action.id;
    }

    async write(actions) {
        const { groups, map } = this._build(actions);
        const content = this._generate(groups, map, actions);

        await fs.writeFile(this.file, content);
    }
}
