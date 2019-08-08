import { assert } from 'chai';
import Test from '../Test';
import chronicle  from '../entry';
import { getTmpFilePath, readFile } from '../utils';

const factory = new Test(chronicle);

suite('json reporter');

before(async () => {
    // await factory.cleanup();
    await factory.setActions();
    await factory.setTmpFolder();
});

const postSeedRequest = {
    href     : 'http://127.0.0.1:62887/users',
    origin   : 'http://127.0.0.1:62887',
    protocol : 'http:',
    hostname : '127.0.0.1',
    port     : '62887',
    path     : '/users',
    query    : {},
    method   : 'POST',
    headers  : { Authorization: '25NPmT' },
    body     : {
        'first_name' : 'Pascal',
        'last_name'  : 'Ancell',
        'email'      : 'pancell1@gravatar.com',
        'gender'     : 'Male'
    }
};
const postSeedResponse = {
    status : { code: 200, message: 'OK' },
    body   : {
        id           : 2,
        'first_name' : 'Pascal',
        'last_name'  : 'Ancell',
        'email'      : 'pancell1@gravatar.com',
        'gender'     : 'Male'
    },
    headers : {
        'x-powered-by'   : 'Express',
        'content-length' : '120'
    },
    info : { type: 'application/json', charset: 'utf-8' },
    http : { version: '1.1' }
};

test.only('json-reporter on seeds', async function () {
    const EXPECTED = [ {
        group  : 'Users',
        titles : [ {
            name    : 'create user',
            actions : [ {
                request  : postSeedRequest,
                response : postSeedResponse
            } ]
        } ]
    } ];
    const file = getTmpFilePath();

    chronicle.save(file, { reporter: 'json' });
    const got = JSON.parse(await readFile(file));

    assert.deepEqual(got, EXPECTED);
});
