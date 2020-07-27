import path from 'path';
import fs from 'fs-extra';
import reporters from '../reporters';
import Action from './Action';

export default class Chronicle {
    constructor(config = {}) {
        this._actions = [];
        this.setConfig(config);
    }

    contextBuilder = c => c

    setContextBuilder(fn) {
        this.contextBuilder = fn;
    }

    setConfig(config) {
        this.config = config;
    }

    action(context) {
        const action = new Action({
            context,
            chronicle : this
        });

        this._actions.push(action);

        return action;
    }

    clear() {
        this._actions = [];
        this.contextBuilder = c => c;
    }

    async save(filePath, opts = {}) {
        const { reporter:reporterType = 'json', ...reporterOptions } = opts;
        const Reporter = reporters[reporterType];

        await fs.ensureDir(path.dirname(filePath));
        const reporter = new Reporter(filePath, reporterOptions);

        await reporter.write(this._actions.map(a => a.data));
    }
}
