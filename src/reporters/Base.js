import dP from 'dot-prop';
import { findGroup } from './utils';

export default class BaseReporter {
    constructor(file) {
        this.file = file;
    }

    _init() {}

    _build(actions, { groupBy = [] } = {}) {
        const map = new Map();
        const groups = {};

        actions.forEach(a => {
            const groupValues = groupBy.map(key => dP.get(a, key));

            findGroup.call(this, groups, groupValues, a.id);
            map.set(a.id, a);
        });

        return { groups, map };
    }

    getHash(action) {
        return action.id;
    }
}
