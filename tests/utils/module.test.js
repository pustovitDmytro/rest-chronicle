import { assert } from 'chai';
import { load } from '../utils';

const { PeerDependency } = load('utils/module');

suite('Utils: module');

test('Load not installed module', function () {
    const module = PeerDependency.load('not-installed-module');

    assert.instanceOf(module, PeerDependency.X);
    assert.instanceOf(module, Error);
    assert.include(module.toString(), "MISSING_PEER_DEPENDENCY: Cannot find module 'not-installed-module'");
});

test('Load installed module', function () {
    const module = PeerDependency.load('myrmidon');

    assert.exists(module);
    assert.isFunction(module.isFunction);
});


test('Check not installed module', function () {
    const module = PeerDependency.load('not-installed-module');

    try {
        PeerDependency.check(module);
        assert.fail('Expected to fail');
    } catch (error) {
        assert.notInstanceOf(error, PeerDependency.X);
        assert.instanceOf(error, Error);
        assert.equal(error.code, 'MODULE_NOT_FOUND');
        assert.include(error.toString(), "Error: Cannot find module 'not-installed-module'");
    }
});


test('Check installed module', function () {
    const module = PeerDependency.load('myrmidon');

    PeerDependency.check(module);
    assert.exists(module);
    assert.isFunction(module.isFunction);
});
