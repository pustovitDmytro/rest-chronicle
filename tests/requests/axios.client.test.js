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

test('Axios usage without context', async function () {
    const response = await axios(`${mockAppUrl}/api/users?limit=10`);
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
        url    : `${mockAppUrl}/api/users`,
        data,
        with   : context
    });

    assert.deepOwnInclude(response.data, data);

    factory.ensureAction(context, {
        method : 'POST',
        path   : '/api/users',
        body   : data
    });
});

test('Axios send xml', async function () {
    const context = { title: 'send xml data', group: 'formats' };
    const xml = '<language><code>en</code></language>';
    const response = await axios
        .post(`${mockAppUrl}/format/xml`,
            xml, {
                with    : context,
                headers : { 'Content-Type': 'text/xml' }
            }
        );

    assert.equal(response.data, '<status>OK</status>');
    assert.match(response.headers['content-type'], /application\/xml/);
    const action = factory.findAction(context);

    assert.exists(action);
});

after(async () => {
    await factory.cleanup();
});
