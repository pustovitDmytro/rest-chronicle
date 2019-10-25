import fse from 'fs-extra';
import { assert } from 'chai';
import Action from '../src/modules/Action';
import app, { actions } from './mock';
import { tmpFolder, mockAppPort } from './constants';

export default class Test {
    constructor(chronicle) {
        this._chronicle = chronicle;
    }
    async startMockApp(port = mockAppPort) {
        return new Promise(res => {
            app.listen(port, res);
        });
    }

    ensureAction({ title, group }, { path, method, body }) {
        const action = this.findAction({ title, group });

        assert.deepOwnInclude(action.request, { path, method });
        if (body) {
            assert.deepOwnInclude(action.response.body, body);
        }
    }

    findAction({ title, group }) {
        return this._chronicle._actions
            .find(a =>
                (title ? a.context.title === title : true) &&
                (group ? a.context.group === group : true)
            ).data;
    }

    async cleanup() {
        this._chronicle.clear();
    }

    async setTmpFolder() {
        await fse.ensureDir(tmpFolder);
    }
    async setActions(chr, actionsToSet = actions) {
        const chronicle = chr || this._chronicle;

        return actionsToSet.map(action => new Action({ ...action, chronicle }));
    }
    async cleanTmpFolder() {
        await fse.remove(tmpFolder);
    }
}

export {
    tmpFolder,
    actions
};
