import path from 'path';
import Mocha from 'mocha';
import { assert } from 'chai';
import { tmpFolder } from '../constants';

const mocha = new Mocha({
    'ui' : 'qunit'
});
const examplesDir = path.join(__dirname, '../../examples/');
const cwd = process.cwd();

before(async () => {
    process.chdir(tmpFolder);
});

suite('Check Examples');

test('messanger', async function () {
    const exampleFolder = path.join(examplesDir, 'messanger');
    const exampleTestFile = path.join(exampleFolder, 'test.js');

    mocha.addFile(exampleTestFile);
    await new Promise((res, rej) => {
        mocha.run(function (failures) {
            if (failures > 0) return rej(new Error(JSON.stringify({ failures })));
            res();
        });
    });

    const swaggerRelativeFilePath = './documentation/swagger.json';
    const gotSwaggerFilePath = path.join(tmpFolder, swaggerRelativeFilePath);
    const expectedSwagerFilePath = path.join(exampleFolder, swaggerRelativeFilePath);

    assert.deepEqual(
        require(gotSwaggerFilePath),
        require(expectedSwagerFilePath),
    );
});

after(async () => {
    process.chdir(cwd);
});
