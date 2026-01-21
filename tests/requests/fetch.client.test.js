import { assert } from 'chai';
import chronicle, { Fetch } from '../entry';
import { users } from '../mock/fixtures';
import Test from '../Test';
import { mockAppUrl } from '../constants';

const factory = new Test(chronicle);
const fetch = new Fetch();

suite('Fetch');

before(async function () {
    await factory.startMockApp();
    await factory.setTmpFolder();
});

test('Fetch without chronicle', async function () {
    const client = new Fetch(null);

    const response = await client(`${mockAppUrl}/api/users?limit=10`);
    const body = await response.json();

    assert.isArray(body);
    assert.isNotEmpty(body);
    assert.deepEqual(body, users);
});

test('Fetch usage without context', async function () {
    const response = await fetch(`${mockAppUrl}/api/users?limit=10`);
    const body = await response.json();

    assert.isArray(body);
    assert.isNotEmpty(body);
    assert.deepEqual(body, users);
});

test('Fetch default function request with chronicle', async function () {
    const data = { 'first_name': 'Alice' };
    const context = { title: 'fetch post', group: 'success' };

    const response = await fetch(`${mockAppUrl}/api/users`, {
        method  : 'POST',
        body    : JSON.stringify(data),
        headers : { 'Content-Type': 'application/json' },
        with    : context
    });

    const body = await response.json();

    assert.deepOwnInclude(body, data);

    factory.ensureAction(context, {
        method : 'POST',
        path   : '/api/users',
        body   : data
    });
});

test('Fetch with with(context) chaining', async function () {
    const context = { title: 'with chaining', group: 'fetch' };
    const response = await fetch
        .with(context)(`${mockAppUrl}/api/users/2`);

    const body = await response.json();

    assert.deepEqual(body, users.find(u => u.id === 2));

    factory.ensureAction(context, {
        method : 'GET',
        path   : '/api/users/2'
    });
});

test('Fetch url params replacement', async function () {
    const context = {
        title     : 'url params',
        group     : 'fetch',
        urlParams : { id: 7 }
    };

    const response = await fetch
        .with(context)(`${mockAppUrl}/api/users/:id`);

    const body = await response.json();

    assert.deepEqual(body, users.find(u => u.id === 7));

    factory.ensureAction(context, {
        method : 'GET',
        path   : '/api/users/:id'
    });
});

test('Fetch text response handling', async function () {
    const context = { title: 'text response', group: 'formats' };

    const response = await fetch(`${mockAppUrl}/format/xml`, {
        method  : 'POST',
        body    : '<language><code>en</code></language>',
        headers : { 'Content-Type': 'text/xml' },
        with    : context
    });

    const text = await response.text();

    assert.equal(text, '<status>OK</status>');

    const action = factory.findAction(context);

    assert.exists(action);
    assert.equal(action.response.body, '<status>OK</status>');
});


test('Clear with for next request', async function () {
    const context = { title: 'clear with', group: 9 };

    await fetch.with(context)(`${mockAppUrl}/api/users/1`);
    factory.ensureAction(context, {
        method : 'GET',
        path   : '/api/users/1'
    });

    await fetch(`${mockAppUrl}/api/users/1`);
    assert.lengthOf(factory.getActions(context), 1);

    await fetch.with(context)(`${mockAppUrl}/api/users/2`);
    assert.lengthOf(factory.getActions(context), 2);
});

after(async function () {
    await factory.cleanup();
});
