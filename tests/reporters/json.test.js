import { assert } from 'chai';
import Test, { actions } from '../Test';
import chronicle, { reporters, Action }  from '../entry';

const Reporter = reporters.json;
const factory = new Test(chronicle);

suite('json reporter');

before(async function () {
    await factory.setTmpFolder();
});

test('Positive: json-reporter with one seed action', async function () {
    const action = new Action({ ...actions[0], chronicle }).data;
    const groups = { [action.context.group]: { [action.context.title]: [ action.id ] } };
    const reporter = new Reporter();
    const map = new Map([ [ action.id, action ] ]);
    const request = {
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
    const response = {
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

    const expected = [ {
        group  : 'Users',
        titles : [ {
            name    : 'create user',
            actions : [ {
                request,
                response
            } ]
        } ]
    } ];

    const got = JSON.parse(reporter._generate(groups, map));

    assert.deepEqual(got, expected);
});
