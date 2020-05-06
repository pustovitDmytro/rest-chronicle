import { assert } from 'chai';
import chronicle, { axios } from '../entry';
import { users } from '../mock/fixtures';
import Test from '../Test';
import { mockAppUrl } from '../constants';

suite('Axios');

const factory = new Test(chronicle);

before(async () => {
    await factory.startMockApp();
    await factory.setTmpFolder();
});

test('Axios usage without chronicle', async function () {
    const response = await axios(`${mockAppUrl}/users?limit=10`);
    const body = response.data;

    assert.isArray(body);
    assert.isNotEmpty(body);
    assert.deepEqual(body, users);
});

test('Axios default function request with chronicle', async function () {
    const data =  users.find(u => u.id === 2);
    const context = { title: 'success is', group: 'wrong' };

    delete data.id;
    const response = await axios({
        method : 'POST',
        url    : `${mockAppUrl}/users`,
        data,
        with   : context
    });

    assert.deepOwnInclude(response.data, data);

    factory.ensureAction(context, {
        method : 'POST',
        path   : '/users',
        body   : data
    });
});
after(async () => {
    await factory.cleanup();
});
