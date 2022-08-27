import { assert } from 'chai';
import nativeAxios from 'axios';
import Test from '../Test';
import chronicle, { reporters, supertest, middlewares }  from '../entry';
import { mockAppUrl } from '../constants';


const factory = new Test(chronicle);
const request = supertest(factory.mockApp);
const expressMiddleWare = middlewares.express(chronicle);

suite('Feature: Buffer');

/* eslint-disable promise/prefer-await-to-callbacks*/
/* eslint-disable no-param-reassign*/
function binaryParser(res, callback) {
    res.setEncoding('binary');
    res.data = '';
    res.on('data', function (chunk) {
        res.data += chunk;
    });
    res.on('end', function () {
        callback(null, Buffer.from(res.data, 'binary'));
    });
}
/* eslint-enable */

const SAMPLE_FILE = 'example of text file\nnew line';

before(async function () {
    await factory.cleanup();
    await factory.setActions(chronicle, [ {
        'context' : {
            'group' : 'Features',
            'title' : 'Buffer'
        },
        'url'     : 'http://127.0.0.1:62887/file.txt',
        'method'  : 'GET',
        'resBody' : Buffer.from('SOME_LONG_BINARY_CONTENT')
    } ]);

    await factory.setTmpFolder();
    factory.mockApp.use(expressMiddleWare(req => {
        return {
            group : 'Format',
            title : req.url
        };
    }));
    await factory.startMockApp();
});

test('Express middleware for get txt Buffer', async function () {
    const response = await nativeAxios.post(`${mockAppUrl}/format/Buffer`);
    const body = response.data;

    assert.isString(body);
    assert.equal(body, SAMPLE_FILE);

    const context = { title: '/format/Buffer', group: 'Format' };

    const action = factory.findAction(context);

    assert.exists(action);
    const actionBody = action.resBody;

    assert.ok(Buffer.isBuffer(actionBody), actionBody);
    assert.equal(actionBody.toString(), 'BINARY DATA');
});

test('Positive: capture Buffer from supertest', async function () {
    const context = { title: 'supertest buf', group: 'BUFF' };

    await request
        .with(context)
        .post('/format/:format')
        .params({ format: 'Buffer' })
        .expect(200)
        .parse(binaryParser)
        .expect((res) => {
            assert.ok(Buffer.isBuffer(res.body));
            assert.equal(
                res.body.toString(),
                SAMPLE_FILE
            );
        });

    const action = factory.findAction(context);

    assert.exists(action);
    const actionBody = action.resBody;

    assert.ok(Buffer.isBuffer(actionBody));
    assert.equal(actionBody.toString(), 'BINARY DATA');
});

test('Positive: save Buffer in api-blueprint', async function () {
    const seed = factory.findAction({
        'group' : 'Features',
        'title' : 'Buffer'
    });
    const action = seed.data;

    const groups = { [action.context.group]: { [action.context.title]: [ action.id ] } };
    const Reporter = reporters['api-blueprint'];

    const reporter = new Reporter();
    const map = new Map([ [ action.id, action ] ]);

    await reporter._init();
    assert.match(reporter._generate(groups, map), /\+ Body\s*<Buffer 42 49 4e 41 52 59 20 44 41 54 41>/);
});

test('Positive: save Buffer in swagger', async function () {
    const seed = factory.findAction({
        'group' : 'Features',
        'title' : 'Buffer'
    });
    const action = seed.data;

    const groups = { [action.context.group]: { [action.context.title]: [ action.id ] } };
    const Reporter = reporters.swagger;

    const reporter = new Reporter();
    const map = new Map([ [ action.id, action ] ]);

    await reporter._init();
    const report = reporter._generate(groups, map);

    const body = JSON.parse(report).paths.Features.buffer.responses['200'];

    assert.deepEqual(
        body.content,
        { 'application/json': { 'schema': { 'type': 'string', 'format': 'binary', 'example': '<Buffer 42 49 4e 41 52 59 20 44 41 54 41>' } } },
        JSON.stringify(body)
    );
});
after(async function () {
    await factory.cleanup();
});
