import { assert } from 'chai';
import axios from 'axios';
import { users } from '../mock/fixtures';
import Test from '../Test';
import { mockAppUrl } from '../constants';
import chronicle, { middlewares } from '../entry';

suite('Express');

const factory = new Test(chronicle);
const expressMiddleWare = middlewares.express(chronicle);


before(async () => {
    await factory.startMockApp();
    await factory.setTmpFolder();
    factory.mockApp.use(expressMiddleWare(req => {
        return {
            group : 'Users',
            title : req.url.includes('limit=10') ? 'With limit' : 'general'
        };
    }));
});

test('Express middleware for get json array', async function () {
    const response = await axios(`${mockAppUrl}/users?limit=10`);
    const body = response.data;

    assert.isArray(body);
    assert.isNotEmpty(body);
    assert.deepEqual(body, users);
    const context = { title: 'With limit', group: 'Users' };

    factory.ensureAction(context, {
        method : 'GET',
        path   : '/users',
        body
    });
});

// test('Axios default function request with chronicle', async function () {
//     const data =  users.find(u => u.id === 2);
//     const context = { title: 'success is', group: 'wrong' };

//     delete data.id;
//     const response = await axios({
//         method : 'POST',
//         url    : `${mockAppUrl}/users`,
//         data,
//         with   : context
//     });

//     assert.deepOwnInclude(response.data, data);

//     factory.ensureAction(context, {
//         method : 'POST',
//         path   : '/users',
//         body   : data
//     });
// });


after(async () => {
    await factory.cleanup();
});
