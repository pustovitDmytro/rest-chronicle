import path from 'path';
import fs from 'fs-extra';
import cls from 'cls-hooked';
import { v4 as uuid } from 'uuid';
import reporters from '../reporters';
import { DEFAULT_CLS_CONTEXT_KEY } from '../constants';
import Action from './Action';

export default class Chronicle {
    constructor(config = {}) {
        this._actions = [];
        this.setConfig(config);
        this.id = config.id || uuid();
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

    split(splitfn) {
        const splitted = new Map();

        this._actions.forEach(item => {
            const chrID = splitfn(item);
            const curr = splitted.get(chrID) || [];

            curr.push(item);
            splitted.set(chrID, curr);
        });

        return [ ...splitted.keys() ].map(groupId => {
            const actions = splitted.get(groupId);
            const chronicle = new Chronicle({
                ...this.config,
                id : groupId
            });

            chronicle.clsEnabled = this.clsEnabled;
            chronicle._cls = this._cls;
            chronicle.contextBuilder = this.contextBuilder;
            console.log('before: ', chronicle.id, chronicle._actions);
            actions.forEach(action => new Action({ ...action, chronicle }));
            console.log('actions: ', actions.length);
            console.log('chronicle: ', chronicle.id, chronicle._actions);

            return chronicle;
        });
    }
}
