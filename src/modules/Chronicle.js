import * as reporters from '../reporters';
import Action from './Action';

export default class Chronicle {
    constructor() {
        this._actions = [];
    }

    action(title, group) {
        const action = new Action({
            title,
            group,
            chronicle : this
        });
        // this._actions.push(action);

        return action;
    }

    clear() {
        this._actions = [];
    }

    async save(filePath, opts = {}) {
        const { reporter:reporterType = 'json', ...reporterOptions } = opts;
        const Reporter = reporters[reporterType];
        const reporter = new Reporter(filePath, reporterOptions);

        await reporter.write(this._actions.map(a => a.data));
    }
}
