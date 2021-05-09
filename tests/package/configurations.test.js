import { assert } from 'chai';
import entry, { Chronicle } from '../entry';
import { tmpFolder } from '../constants';

suite('Configurations');

test('Default configuration', function () {
    assert.exists(entry);
});

test('Default run', async function () {
    assert.exists(Chronicle);
    const chronicle = new Chronicle();

    await chronicle.save(`${tmpFolder}/default.json`);
});
