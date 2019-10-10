import { assert } from 'chai';
import chronicle, { supertest, Chronicle } from '../entry';
import app, { users } from '../mock';
import Test from '../Test';

const factory = new Test(chronicle);
const request = supertest(app);

before(async () => {
    await factory.cleanup();
});

suite.only('Supertest');

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
    const expected =  users.find(u => u.id === 2);
    const context = { title: 'apart', group: 1 };

    await request
        .with(context)
        .get('/users/2')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            assert.deepEqual(body, expected);
        });

    factory.ensureAction(context, {
        method : 'GET',
        path   : '/users/2',
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
