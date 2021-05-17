import path from 'path';
import { inspect } from 'util';
import { v4 as uuid } from 'uuid';
import fse from 'fs-extra';
import { diffLines } from 'diff';
import chalk from 'chalk';
import { tmpFolder, entry } from './constants';


export function getTmpFilePath() {
    return path.join(tmpFolder, uuid());
}

export async function readFile(file) {
    const content = await fse.readFile(file);

    return content.toString();
}

export function compareTexts(a, b, reason = 'text fragments should equal', { ignore = '' } = {}) {
    const words = [ a, b ].map(w => ignore ? w.replace(ignore, '') : w);
    const diff = diffLines(...words, { ignoreWhitespace: true });

    if (diff.some(p => p.removed || p.added)) {
        const res = diff.map(part => {
            const color = part.added && 'green' || part.removed && 'red' || 'grey';
            const isDiffs = part.added || part.removed;
            const value = isDiffs && !part.value.trim()
                ? inspect(part.value)
                : part.value;

            return chalk[color](value);
        }).join('');

        throw new Error(`${reason}: ${res}`);
    }
}

export function load(relPath, clearCache) {
    const absPath = path.resolve(entry, relPath);

    if (clearCache) delete require.cache[require.resolve(absPath)];
    // eslint-disable-next-line security/detect-non-literal-require
    const result =  require(absPath);

    if (clearCache) delete require.cache[require.resolve(absPath)];

    return result;
}

export function resolve(relPath) {
    return require.resolve(path.join(entry, relPath));
}
