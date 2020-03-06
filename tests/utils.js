import path from 'path';
import { inspect } from 'util';
import uuid from 'uuid';
import fse from 'fs-extra';
import { diffWords } from 'diff';
import chalk from 'chalk';
import { tmpFolder } from './constants';

export function getTmpFilePath() {
    return path.join(tmpFolder, uuid.v4());
}

export async function readFile(file) {
    const content = await fse.readFile(file);

    return content.toString();
}

export function compareTexts(a, b) {
    const diff = diffWords(a, b, { ignoreWhitespace: true });

    if (diff.some(p => p.removed || p.added)) {
        const res = diff.map(part => {
            const color = part.added && 'green' || part.removed && 'red' || 'grey';
            const isDiffs = part.added || part.removed;
            const value = isDiffs && !part.value.trim()
                ? inspect(part.value)
                : part.value;

            return chalk[color](value);
        }).join('');

        throw new Error(`text fragments should equal: ${res}`);
    }
}

// require('colors');
// var Diff = require('diff');

// var one = 'beep boop';
// var other = 'beep boob blah';

// var diff = Diff.diffChars(one, other);

// diff.forEach(function(part){
//   // green for additions, red for deletions
//   // grey for common parts
//   var color = part.added ? 'green' :
//     part.removed ? 'red' : 'grey';
//   process.stderr.write(part.value[color]);
// });
