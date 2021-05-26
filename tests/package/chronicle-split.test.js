import { assert } from 'chai';
import Test from '../Test';
import chronicle  from '../entry';

suite('Chronicle split');

const factory = new Test(chronicle);

before(async function () {
    await factory.startMockApp();
    await factory.cleanup();
    await factory.setActions();
});

test('Split actions', function () {
    const splitted = chronicle.split(action => {
        return action.group;
    });

    assert.lengthOf(chronicle._actions, 4);
    assert.lengthOf(splitted, 2);
    const userGroup = splitted.find(s => s.id === 'Users');

    assert.lengthOf(userGroup._actions, 3);
    const orderGroup = splitted.find(s => s.id === 'Orders');

    assert.lengthOf(orderGroup._actions, 1);
});

after(async function () {
    await factory.cleanup();
});
