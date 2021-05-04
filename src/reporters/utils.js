import { isArray } from 'myrmidon';

export function findGroup(obj, filters, id, index = 0) {
    const { mergeArray } = this;

    if (index === filters.length) {
        if (mergeArray && isArray(obj)) return [ ...obj, id ];

        return [ id ];
    }

    obj[filters[index]] = findGroup.call(  // eslint-disable-line no-param-reassign
        this,
        obj[filters[index]] || {},
        filters,
        id,
        index + 1
    );

    return obj;
}

export function detectType(value, extra = {}) {
    if (extra.null && value === null) return extra.null;

    return typeof value;
}
