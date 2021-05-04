#!./node_modules/.bin/babel-node

import { docopt } from 'docopt';
import { generateActions } from '../tests/mock/generators';
import { buildDocoptParams } from './utils';


const doc = `Usage:
   generate.js actions <count>
   generate.js -h | --help
Options:
   -h --help                 Show this screen.
   -l --login <email>        Login for new user.
   -p --password <password>  Password for new user.
`;

async function main(opts) {
    try {
        if (opts.actions) {
            await generateActions(+opts['<count>'], buildDocoptParams(opts));
        }

        process.exit(0);
    } catch (error) {
        console.log('FAILED');
        console.log(error);
        process.exit(1);
    }
}

main(docopt(doc));
