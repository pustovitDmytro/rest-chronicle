import chronicle, { supertest } from '../../src';
import app from './app';

const request = supertest(app);

function contextBuilder({ urlParams, rawUrl, test }) {
    return {
        urlParams,
        rawUrl,
        title : test.title,
        group : test.parent.title
    };
}

before(async () => {
    chronicle.setContextBuilder(contextBuilder);
});

suite('Users');
test('Positive: show user profile', async function () {
    await request
        .with(this)
        .get('/users/:id')
        .params({ id: 1 })
        .expect('Content-Type', /json/)
        .expect(200);
});

test('Positive: change user name', async function () {
    await request
        .with(this)
        .patch('/users/:id')
        .params({ id: 2 })
        .set({ 'AUTH': '5NM2p40Z8' })
        .send({ name: 'McCoy' })
        .expect('Content-Type', /json/)
        .expect(200);
});

suite('Messages');

test('Positive: get list of messages', async function () {
    await request
        .with(this)
        .get('/messages?sender=2&limit=5')
        .set({ 'AUTH': '5NM2p40Z8' })
        .send({ name: 'McCoy' })
        .expect('Content-Type', /json/)
        .expect(200);
});

after(async () => {
    await chronicle.save('./documentation/swagger.json', {
        reporter : 'swagger'
    });
});
