import fse from 'fs-extra';
import { assert } from 'chai';
import Action from '../src/modules/Action';
import app, { fixtures } from './mock';
import { tmpFolder, mockAppPort } from './constants';

const { actions } = fixtures;

export default class Test {
    constructor(chronicle) {
        this._chronicle = chronicle;
    }
    async startMockApp(port = mockAppPort) {
        return new Promise(res => {
            this.app = app.listen(port, res);
        });
    }

    stopMockApp() {
        if (this.app) this.app.close();
    }

    ensureAction({ title, group }, { path, method, body }) {
        const action = this.findAction({ title, group });

        assert.deepOwnInclude(action.request, { path, method });
        if (body) {
            assert.deepOwnInclude(action.response.body, body);
        }
    }

    findAction({ title, group }) {
        const action  =  this._chronicle._actions
            .find(a =>
                (title ? a.context.title === title : true) &&
                (group ? a.context.group === group : true)
            );

        if (!action) {
            throw new Error(`action ${group}: ${title} not found in${ this._chronicle._actions.map(a => JSON.stringify(a.context)).join(',')}`);
        }

        return action.data;
    }

    async cleanup() {
        this.actions = [];
        this._chronicle.clear();
        this.stopMockApp();
    }

    async setTmpFolder() {
        await fse.ensureDir(tmpFolder);
    }
    async setActions(chr, actionsToSet = actions) {
        const chronicle = chr || this._chronicle;

        this.actions =  actionsToSet.map(action => new Action({ ...action, chronicle }));

        return this.actions;
    }
    async cleanTmpFolder() {
        await fse.remove(tmpFolder);
    }
}

export {
    tmpFolder,
    fixtures,
    actions
};
