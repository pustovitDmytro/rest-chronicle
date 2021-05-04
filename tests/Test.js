import fse from 'fs-extra';
import { assert } from 'chai';
import Action from '../src/modules/Action';
import createMockApp, { fixtures } from './mock';
import { tmpFolder, mockAppPort } from './constants';

const { actions } = fixtures;

export default class Test {
    constructor(chronicle) {
        this._chronicle = chronicle;
        this.mockApp = createMockApp();
    }

    async startMockApp(port = mockAppPort) {
        this.app = await this.mockApp.start(port);
    }

    stopMockApp() {
        if (this.app) this.app.close();
    }

    ensureAction({ title, group }, { path, method, body }) {
        const action = this.findAction({ title, group });

        assert.deepOwnInclude(action.request, { path, method });
        if (body) {
            if (body.length) {
                assert.deepEqual(action.response.body, body);
            } else {
                assert.deepOwnInclude(action.response.body, body);
            }
        }
    }

    findAction({ title, group }) {
        const action  =  this._chronicle._actions
            .find(a =>
                (title ? a.context.title === title : true) &&
                (group ? a.context.group === group : true));

        if (!action) {
            const actionsList = this._chronicle._actions.map(a => JSON.stringify(a.context)).join(',');

            throw new Error(`action ${group}: ${title} not found in ${actionsList}`);
        }

        return action;
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
