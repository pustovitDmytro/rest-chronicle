import test from 'ava';
import chronicle, { axios } from '../../tests/entry';
import express from './app';

const app = {};

function contextBuilder(context) {
    return {
        title : context.chronicle.title,
        group : context.chronicle.group
    };
}

test.before(async () => {
    chronicle.setContextBuilder(contextBuilder);

    await new Promise(res => {
        const server = express.listen(0, () => {
            const { port } = server.address();

            app.port = port;
            app.url = `http://localhost:${port}`;
            app.server = server;
            res();
        });
    });
});

test.beforeEach(t => {
    t.context.chronicle = {
        group : 'Posts',
        title : t.title.replace('beforeEach hook for ', '')
    };
});

test('Positive: show first post', async function (t) {
    const res = await axios
        .with(t.context)
        .get(`${app.url}/posts/1`);

    t.is(res.status, 200);
    t.assert(res.data);
});

test('Positive: show single post by id', async function (t) {
    const res = await axios
        .with(t.context)
        .get(`${app.url}/posts/:id`, { params: { id: 2 } });

    t.is(res.status, 200);
    t.assert(res.data);
});

test('Negative: post not found', async function (t) {
    const res = await axios
        .with(t.context)
        .get(`${app.url}/posts/:id`, { params: { id: 16 } })
        .catch(err => err);

    t.is(res.response.status, 404);
});

test('Negative: bad id', async function (t) {
    const res = await axios
        .with(t.context)
        .get(`${app.url}/posts/:id`, { params: { id: 'abcd' } })
        .catch(err => err);

    t.is(res.response.status, 404);
});

test.after('cleanup', async () => {
    const docsDir = process.env.DOCS || './documentation';

    await chronicle.save(`${docsDir}/swagger.json`, {
        reporter : 'swagger',
        hash     : action => action.context.title.replace(/\W/g, ' ').replace(/\s+/g, '_').toLowerCase()
    });
    chronicle.clear();
});

// after(async () => {
//     await chronicle.save('./documentation/swagger.json', { reporter: 'swagger' });
//     await chronicle.save('./documentation/api-blueprint.md', { reporter: 'api-blueprint' });
// });
