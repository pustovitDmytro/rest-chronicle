import path from 'path';
import uuid from 'uuid';
import fse from 'fs-extra';
import { tmpFolder } from './constants';

export function getTmpFilePath() {
    return path.join(tmpFolder, uuid.v4());
}

export async function readFile(file) {
    const content = await fse.readFile(file);

    return content.toString();
}
