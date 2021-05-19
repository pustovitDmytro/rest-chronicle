import path from 'path';
import fs from 'fs-extra';
import cls from 'cls-hooked';
import reporters from '../reporters';
import { DEFAULT_CLS_CONTEXT_KEY } from '../constants';
import Action from './Action';

export default class Chronicle {
    constructor(config = {}) {
        this._actions = [];
        this.setConfig(config);
    }

    useCLS(namespace, contextKey = DEFAULT_CLS_CONTEXT_KEY) {
        this.clsEnabled = true;
        this._cls = { namespace, contextKey };
    }

    getCLSContext() {
        const namespace = cls.getNamespace(this._cls.namespace);

        return namespace.get(this._cls.contextKey);
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
        this.setConfig({});
    }

    async save(filePath, opts = {}) {
        const { reporter:reporterType = 'json', ...reporterOptions } = opts;
        const Reporter = reporters[reporterType];

        await fs.ensureDir(path.dirname(filePath));
        const reporter = new Reporter(filePath, reporterOptions);

        await reporter.write(this._actions.map(a => a.data));
    }
}
