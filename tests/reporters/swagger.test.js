import { assert } from 'chai';
import Test from '../Test';
import chronicle, { Chronicle, reporters }  from '../entry';
import { getTmpFilePath, readFile } from '../utils';

const factory = new Test(chronicle);

suite('swagger reporter');

before(async () => {
    // await factory.cleanup();
    // await factory.setActions();
    await factory.setTmpFolder();
});


test('Positive: swagger reporter grouping', async function () {
    const instance = new Chronicle();
    const reporter = new Reporter();

    factory.setRandomActions([
        [ 'get', '/users?name=A' ],
        [ 'post', '/users' ],
        [ 'post', '/users' ]
    ], instance);

    const { groups } = await reporter._build(instance._actions.map(a => a.data));
});


// test('Positive: basic structure', async function () {
//     const file = getTmpFilePath();

//     chronicle.save(file, { reporter: 'swagger' });
//     const got = JSON.parse(await readFile(file));
// });
