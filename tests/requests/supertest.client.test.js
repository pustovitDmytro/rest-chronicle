import { assert } from 'chai';
import chronicle, { supertest } from '../entry';
import  { fixtures } from '../mock';
import Test from '../Test';

const { users } = fixtures;
const factory = new Test(chronicle);
const request = supertest(factory.mockApp);

suite('Supertest');

before(async () => {
    await factory.startMockApp();
    await factory.cleanup();
});

test('Supertest usage without chronicle', async function () {
    await request
        .get('/users')
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
        .get('/users/:id')
        .params({ id: 7 })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            assert.deepEqual(body, expected);
        });

    factory.ensureAction(context, {
        method : 'GET',
        path   : '/users/:id',
        body   : expected
    });
});

test('Supertest with .end resolving', async function () {
    const data = { 'first_name': 'Gertrude' };
    const context = { title: 'support', group: 1 };

    await request
        .get('/users/5')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            assert.isNotEmpty(body);
        });
    let actualbody;

    await new Promise((res, rej) => {
        request
            .with(context)
            .patch('/users/4')
            .send(data)
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

    factory.ensureAction(context, {
        method : 'PATCH',
        path   : '/users/4',
        body   : actualbody
    });
});

after(async () => {
    await factory.cleanup();
});
