import { assert } from 'chai';
import Test, { fixtures } from '../Test';
import chronicle, { reporters }  from '../entry';

const Reporter = reporters.swagger;
const factory = new Test(chronicle);

suite('swagger reporter');

before(async function () {
    await factory.cleanup();
    await factory.setActions();
    await factory.setTmpFolder();
});


// test('Positive: swagger reporter grouping', async function () {
//     const instance = new Chronicle();
//     const reporter = new Reporter();

//     factory.setRandomActions([
//         [ 'get', '/users?name=A' ],
//         [ 'post', '/users' ],
//         [ 'post', '/users' ]
//     ], instance);

//     const { groups } = await reporter._build(instance._actions.map(a => a.data));
// });


test('Positive: swagger action template', async function () {
    const reporter = new Reporter();

    assert.deepEqual(
        reporter._renderAction(factory.actions[0]),
        fixtures.reports.swagger.createUserAction
    );
});
