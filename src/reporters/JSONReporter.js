import fs from 'fs-extra';

export default class JSONReporter {
    constructor(file, opts) {
        this.file = file;
    }
    _build(actions) {
        const map = new Map();
        const groups = [];

        actions.forEach(a => {
            const { id, context } = a;
            const group = groups.find(g => g.name === context.group);

            if (!group) {
                groups.push({
                    group  : context.group,
                    titles : [ {
                        title   : context.title,
                        actions : [ id ]
                    } ]
                });
            }
            map.set(id, a);
        });

        return { groups, map };
    }
    _generate(groups, map) {
        const injected = groups.map(g => ({
            group  : g.group,
            titles : g.titles.map(t => ({
                name    : t.title,
                actions : t.actions
                    .map(id => map.get(id))
                    .map(action => ({
                        request  : action.request,
                        response : action.response
                    }))
            }))
        }));

        return JSON.stringify(injected, null, 4);
    }
    async write(actions) {
        const { groups, map } = this._build(actions);
        const content = this._generate(groups, map);

        await fs.writeFile(this.file, content);
    }
}
