import fse from 'fs-extra';
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

    async setTmpFolder() {
        await fse.ensureDir(tmpFolder);
    }
    async setActions(chr, actionsToSet = actions) {
        const chronicle = chr || this._chronicle;

        return actionsToSet.map(action => new Action({ ...action, chronicle }));
    }

    async setRandomActions(config, chr) {

    }

    async cleanTmpFolder() {
        await fse.remove(tmpFolder);
    }
}

export {
    tmpFolder,
    actions
};
