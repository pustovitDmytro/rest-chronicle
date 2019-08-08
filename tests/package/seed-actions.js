import { assert } from 'chai';
import Action from '../../src/modules/Action';
import { actions } from '../Test';

suite('Seed actions');

test('POST request', async function () {
    const seed = actions[0];
    const action = new Action(seed);
    const expected = {
        context : {
            title : 'create user',
            group : 'Users'
        },
        request : {
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
        },
        response : {
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
        }
    };

    assert.deepEqual(action.data, expected);
});

