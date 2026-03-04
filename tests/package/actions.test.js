import { assert } from 'chai';
import chronicle  from '../entry';

suite('Actions');

test('Manually setting required attributes', function () {
    const action = chronicle.action({ title: 'get users', group: 'Users' });

    action.url = 'http://localhost:8080/api/users?status=ACTIVE';

    action.response = {
        headers : { 'content-type': 'application/json' },
        code    : 200,
        body    : []
    };

    const {
        request,
        response,
        context
    } = action.data;

    assert.equal(context.title, 'get users');
    assert.equal(context.group, 'Users');

    assert.deepEqual(request, {
        href     : 'http://localhost:8080/api/users?status=ACTIVE',
        origin   : 'http://localhost:8080',
        protocol : 'http:',
        hostname : 'localhost',
        port     : '8080',
        path     : '/api/users',
        query    : { status: 'ACTIVE' },
        method   : 'GET',
        headers  : null,
        'info'   : {
            'charset' : 'utf-8',
            'type'    : 'application/json'
        }

    });

    assert.deepOwnInclude(response, {
        headers : { 'content-type': 'application/json' },
        'http'  : {
            'version' : '1.1'
        },
        'info' : {
            'charset' : 'utf-8',
            'type'    : 'application/json'
        },
        'status' : {
            'code'    : 200,
            'message' : 'OK'
        },
        body : []
    });
});

