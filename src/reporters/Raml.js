import fs from 'fs-extra';
import dP from 'dot-prop';
import { isObject, flatten, isEmpty } from 'myrmidon';
import yaml from 'js-yaml';
import { DEFAULT_JSON_OFFSET } from '../constants';
import { findGroup, detectType } from './utils';
import Base from './Base';

function dictionary(obj, prefix = []) {
    return flatten(Object.entries(obj)
        .map(([ key, value ]) => {
            if (isObject(value)) return dictionary(value, [ ...prefix, key ]);

            return { key: [ ...prefix, key ], value };
        }));
}

const types = { null: 'nil' };

export default class RamlReporter extends Base {
    constructor(file, { hash } = {}) {
        super(file);
        if (hash) this.getHash = hash;
    }

    mergeArray = true;

    _build(actions) {
        const map = new Map();
        const groups = {};

        for (const a of actions) {
            const { path, method } = a.request;

            const resources = path.split('/').filter(i => i).map(i => `/${i}`);

            const groupValues = [ ...resources, method.toLowerCase() ];

            findGroup.call(this, groups, groupValues, a.id);
            map.set(a.id, a);
        }

        return { groups, map };
    }

    _renderHeaders(headers) {
        return Object.entries(headers)
            // eslint-disable-next-line unicorn/prefer-object-from-entries, unicorn/no-array-reduce
            .reduce((prev, [ name, value ]) => ({
                ...prev,
                [name] : {
                    example : value,
                    type    : detectType(value, types)
                }
            }), {});
    }

    _renderBody(body) {
        const result = {
            type    : detectType(body, types),
            example : isEmpty(body) ? body : JSON.stringify(body, null, DEFAULT_JSON_OFFSET)
        };

        if (body && result.type === 'object') {
            for (const [ key, value ] of Object.entries(body)) {
                dP.set(result, `properties.${key}`, {
                    type : detectType(value, types)
                });
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

        for (const item of dict) {
            if (item.value.length === 1)  {
                hashed.push({ key: item.key, value: item.value[0] }); continue;
            }

            const [ original, ...dublicates ] = item.value;

            hashed.push({ key: item.key, value: original });
            for (const actionId of dublicates) {
                const action = map.get(actionId);
                const hash = this.getHash(action);
                const [ method, lastPath, ...pathRev ] = [ ...item.key ].reverse();

                hashed.push({
                    key   : [ ...pathRev.reverse(), `${lastPath}#${hash}`, method ],
                    value : actionId
                });
            }
        }

        const paths = {};
        const origins = [ ...new Set(actions.map(a => a.request.origin)) ];

        for (const item of hashed) {
            const action = map.get(item.value);

            dP.set(paths, item.key.join('.'), this._renderAction(action));
        }

        const content = {
            title           : 'Raml report',
            baseUri         : origins[0],
            version         : '1.0.0',
            annotationTypes : { group: 'string' },
            ...paths
        };

        return `#%RAML 1.0\n${yaml.dump(content)}`;
    }

    async write(actions) {
        const { groups, map } = this._build(actions);
        const content = this._generate(groups, map, actions);

        await fs.writeFile(this.file, content);
    }
}
