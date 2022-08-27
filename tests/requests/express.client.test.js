import { assert } from 'chai';
import axios from 'axios';
import { users } from '../mock/fixtures';
import Test from '../Test';
import { mockAppUrl } from '../constants';
import chronicle, { middlewares } from '../entry';

suite('Express');

const factory = new Test(chronicle);
const expressMiddleWare = middlewares.express(chronicle);

before(async function () {
    await factory.setTmpFolder();
    factory.mockApp.use(expressMiddleWare(req => {
        if (req.url.includes('format')) {
            return {
                group : 'Format',
                title : req.url
            };
        }

        return {
            group : 'Users',
            title : req.url.includes('limit=10') ? 'With limit' : 'general'
        };
    }));
    await factory.startMockApp();
});

test('Express middleware for get json array', async function () {
    const response = await axios(`${mockAppUrl}/api/users?limit=10`);
    const body = response.data;

    assert.isArray(body);
    assert.isNotEmpty(body);
    assert.deepEqual(body, users);
    const context = { title: 'With limit', group: 'Users' };

    factory.ensureAction(context, {
        method : 'GET',
        path   : '/api/users',
        body
    });
});

after(async function () {
    await factory.cleanup();
});
