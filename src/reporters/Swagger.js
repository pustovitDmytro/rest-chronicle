/* eslint-disable no-param-reassign */
import { inspect } from 'util';
import fs from 'fs-extra';
import dP from 'dot-prop';
import { toArray, uniqueIdenticFilter } from 'myrmidon';
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

function actionsSorter(a, b) {
    if (a.response.status.code !== b.response.status.code) {
        return a.response.status.code - b.response.status.code;
    }

    return a.meta.createdAt - b.meta.createdAt;
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

        if (body && (body.constructor?.name === 'File' || body.constructor?.name === 'Blob')) {
            return {
                type   : 'string',
                format : 'binary'
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

    /**
     * Helper to merge two schemas (mostly for Object properties)
     * Keeps the first type found if they differ.
     */
    _mergeSchemas(target, source) {
        if (!target) return source;
        if (!source) return target;

        // If types mismatch, we can't cleanly merge, stick with target but maybe relax it?
        // For now, we assume consistent types or just return target.
        if (target.type !== source.type) return target;

        if (target.type === 'object' && source.properties) {
            target.properties = target.properties || {};
            for (const [ key, val ] of Object.entries(source.properties)) {
                if (!target.properties[key]) {
                    // New property found in source, add it
                    target.properties[key] = val;
                } else {
                    // Property exists, recursively merge
                    target.properties[key] = this._mergeSchemas(target.properties[key], val);
                }
            }
        }


        return target;
    }

    // eslint-disable-next-line sonarjs/cognitive-complexity
    _renderAction(actionInput) {
        const actions = toArray(actionInput).sort(actionsSorter);

        if (!actions || actions.length === 0) return {};

        const isSingle = actions.length === 1;
        // const baseAction = getBaseAction(actions);
        // const { group, title } = baseAction.context;

        // 1. Merge Parameters
        const paramsMap = new Map();

        actions.forEach(action => {
            const headers = this._renderHeaders(action.request.headers);

            headers.forEach(param => {
                const key = `${param.name}:${param.in}`;

                if (!paramsMap.has(key)) paramsMap.set(key, param);
            });
        });

        // 2. Process Request Body
        let requestBody;
        const requestContentMap = {};

        actions.forEach(action => {
            if (!action.request.body) return;
            const contentType = action.request.info.type || 'application/json';

            if (!requestContentMap[contentType]) {
                requestContentMap[contentType] = { schemas: [], examples: {} };
            }

            const generatedSchema = this._renderBody(action.request.body);

            requestContentMap[contentType].schemas.push(generatedSchema);

            let exampleKey = action.context.title;

            let counter = 1;

            while (requestContentMap[contentType].examples[exampleKey]) {
                exampleKey = `${action.context.title} (${counter++})`;
            }

            requestContentMap[contentType].examples[exampleKey] = {
                summary : action.context.title,
                value   : generatedSchema.example
            };
        });

        if (Object.keys(requestContentMap).length > 0) {
            requestBody = { content: {} };
            for (const [ contentType, data ] of Object.entries(requestContentMap)) {
                const finalSchema = data.schemas.reduce((acc, s) => this._mergeSchemas(acc, s), data.schemas[0]);

                requestBody.content[contentType] = { schema: finalSchema };

                if (isSingle) {
                // Keep old structure: example inside schema
                    finalSchema.example = Object.values(data.examples)[0].value;
                } else {
                // Use plural examples map for multiple actions
                    delete finalSchema.example;
                    requestBody.content[contentType].examples = data.examples;
                }
            }
        }

        // 3. Process Responses
        const responses = {};
        const responseGroups = {};

        actions.forEach(action => {
            const code = action.response.status.code;

            if (!responseGroups[code]) responseGroups[code] = [];
            responseGroups[code].push(action);
        });

        for (const [ code, groupActions ] of Object.entries(responseGroups)) {
            const isSingleResponse = groupActions.length === 1;
            const responseContentMap = {};

            groupActions.forEach(action => {
                const contentType = action.response.info.type || 'application/json';

                if (!responseContentMap[contentType]) {
                    responseContentMap[contentType] = { schemas: [], examples: {} };
                }

                const generatedSchema = this._renderBody(action.response.body);

                responseContentMap[contentType].schemas.push(generatedSchema);

                let exampleKey = action.context.title;

                let counter = 1;

                while (responseContentMap[contentType].examples[exampleKey]) {
                    exampleKey = `${action.context.title} (${counter++})`;
                }

                responseContentMap[contentType].examples[exampleKey] = {
                    summary : action.context.title,
                    value   : generatedSchema.example
                };
            });
            responses[code] = {
                description : groupActions[0].context.title,
                content     : {}
            };

            for (const [ contentType, data ] of Object.entries(responseContentMap)) {
                const finalSchema = data.schemas.reduce((acc, s) => this._mergeSchemas(acc, s), data.schemas[0]);

                responses[code].content[contentType] = { schema: finalSchema };

                if (isSingleResponse) {
                // Keep old structure
                    finalSchema.example = Object.values(data.examples)[0].value;
                } else {
                // New structure for multiple examples
                    delete finalSchema.example;
                    responses[code].content[contentType].examples = data.examples;
                }
            }
        }

        return {
            // eslint-disable-next-line unicorn/no-array-callback-reference
            tags        : actions.map(a => a.context.group).filter(uniqueIdenticFilter),
            description : actions.map(a => a.context.title).join('. '),
            parameters  : [ ...paramsMap.values() ],
            requestBody,
            responses
        };
    }

    _generate(groups, map, actions) {
        const paths = {};
        const origins = [ ...new Set(actions?.map(a => a.request.origin)) ];

        for (const [ path, methods ] of Object.entries(groups)) {
            for (const [ method, actionIds ] of Object.entries(methods)) {
                const methodName = method.toLowerCase();

                // Get ALL actions for this Path + Method combination
                const groupActions = actionIds.map(id => map.get(id));

                // Generate a single definition merging all actions
                dP.set(
                    paths,
                    `${path}.${methodName}`,
                    this._renderAction(groupActions)
                );
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
