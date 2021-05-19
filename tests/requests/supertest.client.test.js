import { assert } from 'chai';
import cls from 'cls-hooked';
import chronicle, { supertest } from '../entry';
import  { fixtures } from '../mock';
import Test from '../Test';

const ns = cls.createNamespace('cls-supertest-ns');
const { users } = fixtures;
const factory = new Test(chronicle);
const request = supertest(factory.mockApp);

suite('Supertest');

before(async () => {
    await factory.startMockApp();
    await factory.cleanup();
    chronicle.useCLS('cls-supertest-ns');
});

test('Supertest usage without chronicle', async function () {
    await request
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            assert.isArray(body);
            assert.isNotEmpty(body);
            assert.deepEqual(body, users);
        });
});

test('Supertest getOne request with chronicle', async function () {
    const expected =  users.find(u => u.id === 7);
    const context = { title: 'apart', group: 1 };

    await request
        .with(context)
        .get('/api/users/:id')
        .params({ id: 7 })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            assert.deepEqual(body, expected);
        });

    factory.ensureAction(context, {
        method : 'GET',
        path   : '/api/users/:id',
        body   : expected
    });
});

test('Supertest with .end resolving', async function () {
    const data = { 'first_name': 'Gertrude' };
    const context = { title: 'support', group: 1 };

    await request
        .get('/api/users/5')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            assert.isNotEmpty(body);
        });
    let actualbody;

    await new Promise((res, rej) => {
        request
            .with(context)
            .patch('/api/users/4')
            .send(data)
            .set('X-API-Key', 'foobar')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(({ body }) => {
                assert.deepOwnInclude(body, {
                    id : 4,
                    ...data
                });
                actualbody = body;
            })
            .end((err, result) => {
                if (err) rej(err);
                res(result);
            });
    });

    const action = factory.ensureAction(context, {
        method : 'PATCH',
        path   : '/api/users/4'
    });

    assert.deepEqual(action.response.body, actualbody);
    assert.deepOwnInclude(action.request.headers, { 'X-API-Key': 'foobar' });
});


test('Supertest load context from cls without with', async function () {
    const user =  users.find(u => u.id === 3);
    const context = { title: 'grandfather', group: 3 };
    const data = { 'first_name': 'Susie' };

    await new Promise((res, rej) => {
        ns.run(async () => {
            ns.set('chronicle-context', context);
            await request
                .patch('/api/users/3')
                .send(data)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(({ body }) => {
                    assert.deepOwnInclude(body, {
                        ...user,
                        ...data
                    });
                    res();
                })
                .catch(rej);
        });
    });

    factory.ensureAction(context, {
        method : 'PATCH',
        path   : '/api/users/3',
        body   : data
    });
});

test('Clear with for second request', async function () {
    const context = { title: 'first request', group: 9 };

    await request
        .with(context)
        .get('/api/users/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            assert.deepEqual(body, users[0]);
        });

    factory.ensureAction(context, {
        method : 'GET',
        path   : '/api/users/1'
    });

    await request
        .get('/api/users/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            assert.deepEqual(body, users[0]);
        });

    await request
        .with(null)
        .get('/api/users/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            assert.deepEqual(body, users[0]);
        });

    assert.lengthOf(factory.getActions(context), 1);

    await request
        .with(context)
        .get('/api/users/2')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            assert.deepEqual(body, users[1]);
        });

    assert.lengthOf(factory.getActions(context), 2);
});

after(async () => {
    await factory.cleanup();
});
