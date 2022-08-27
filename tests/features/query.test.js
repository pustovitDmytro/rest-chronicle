import { assert } from 'chai';
import Test from '../Test';
import chronicle, { reporters, Axios }  from '../entry';
import { mockAppUrl } from '../constants';

const Reporter = reporters['api-blueprint'];

const factory = new Test(chronicle);
const axios = new Axios(chronicle);

suite('Feature: request query');

before(async function () {
    await factory.cleanup();
    await factory.setActions();
    await factory.setTmpFolder();
    await factory.startMockApp();
});

test('Positive: capture query from axios', async function () {
    const context = { title: 'paggination', group: 'axios queries' };

    const response = await axios({
        method : 'GET',
        url    : `${mockAppUrl}/api/users?limit=10&offset=20`,
        with   : context
    });

    assert.isNotEmpty(response.data);
    const action = factory.ensureAction(context, {
        method : 'GET',
        path   : '/api/users'
    });

    assert.deepOwnInclude(action.toJSON().request, {
        query : { limit: '10', offset: '20' }
    });
});

test('Positive: save query in api-blueprint', async function () {
    const seed = factory.findAction({
        'group' : 'Features',
        'title' : 'query'
    });
    const action = seed.data;

    const groups = { [action.context.group]: { [action.context.title]: [ action.id ] } };
    const reporter = new Reporter();
    const map = new Map([ [ action.id, action ] ]);

    await reporter._init();
    assert.match(reporter._generate(groups, map), /\+ Request\s*\+ Parameters\s*status: ACTIVE/);
});

after(async function () {
    await factory.cleanup();
});
