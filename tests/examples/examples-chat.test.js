import path from 'path';
import Mocha from 'mocha';
import { assert } from 'chai';
import fs from 'fs-extra';
import { tmpFolder } from '../constants';
import  chronicle  from '../entry';
import { compareTexts } from '../utils';

const mocha = new Mocha({
    'ui' : 'qunit'
});
const examplesDir = path.join(__dirname, '../../examples/');
const cwd = process.cwd();

suite('Chat Example #no-pack');

before(async function () {
    await fs.ensureDir(tmpFolder);
    process.chdir(tmpFolder);
});


test('chat', async function () {
    const exampleFolder = path.join(examplesDir, 'chat');
    const exampleTestFile = path.join(exampleFolder, 'test.js');

    mocha.addFile(exampleTestFile);
    await new Promise((res, rej) => {
        mocha.run(function (failures) {
            if (failures > 0) {
                return rej(new Error(JSON.stringify({ failures })));
            }

            res();
        });
    });

    const swaggerRelativeFilePath = './documentation/swagger.json';
    const gotSwaggerFilePath = path.join(tmpFolder, swaggerRelativeFilePath);
    const expectedSwagerFilePath = path.join(exampleFolder, swaggerRelativeFilePath);

    assert.deepEqual(
        { ...require(gotSwaggerFilePath), servers: [] },
        { ...require(expectedSwagerFilePath),  servers: [] },
        'swagger report'
    );

    const blueprintRelativeFilePath = './documentation/api-blueprint.md';
    const actualBluePrintFilePath = path.join(tmpFolder, blueprintRelativeFilePath);
    const expectedBluePrintFilePath = path.join(exampleFolder, blueprintRelativeFilePath);

    compareTexts(
        (await fs.readFile(actualBluePrintFilePath)).toString(),
        (await fs.readFile(expectedBluePrintFilePath)).toString(),
        'api-blueprint report',
        { ignore: /date:.*\s/g }
    );
});

after(async function () {
    process.chdir(cwd);
    chronicle.clear();
});

