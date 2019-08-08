import fse from 'fs-extra';
import Action from '../src/modules/Action';
import { tmpFolder } from './constants';
import { actions } from './mock/fixtures';

export default class Test {
    constructor(chronicle) {
        this._chronicle = chronicle;
    }
    async setTmpFolder() {
        await fse.ensureDir(tmpFolder);
    }
    async setActions(c) {
        const chronicle = this._chronicle || c;

        return actions.map(action => new Action({ ...action, chronicle }));
    }
    async cleanTmpFolder() {
        await fse.remove(tmpFolder);
    }
}

export {
    tmpFolder,
    actions
};
