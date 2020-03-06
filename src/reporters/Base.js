import dP from 'dot-prop';

function findGroup(obj, filters, id, index = 0) {
    if (index === filters.length) return [ id ];
    obj[filters[index]] = findGroup(  // eslint-disable-line no-param-reassign
        obj[filters[index]] || {},
        filters,
        id,
        index + 1
    );

    return obj;
}

export default class BaseReporter {
    constructor(file) {
        this.file = file;
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
}
