import path from 'path';
import { execSync } from 'child_process';
import { assert } from 'chai';
import fs from 'fs-extra';
import { tmpFolder } from '../constants';
import  chronicle  from '../entry';
// import { compareTexts } from '../utils';

const examplesDir = path.join(__dirname, '../../examples/');
const docsDir = path.join(tmpFolder, 'blog-example');

suite.only('Chat Example');

before(async () => {
    await fs.ensureDir(docsDir);
});


test('chat', async function () {
    await execSync('npx ava', {
        env : {
            ...process.env,
            DOCS : docsDir
        },
        stdio : 'inherit'
    });

    const exampleFolder = path.join(examplesDir, 'blog');
    const gotSwaggerFilePath = path.join(docsDir, 'swagger.json');
    const expectedSwagerFilePath = path.join(exampleFolder, './documentation/swagger.json');

    assert.deepEqual(
        { ...require(gotSwaggerFilePath), servers: [] },
        { ...require(expectedSwagerFilePath),  servers: [] },
        'swagger report'
    );

    // const blueprintRelativeFilePath = './documentation/api-blueprint.md';
    // const actualBluePrintFilePath = path.join(tmpFolder, blueprintRelativeFilePath);
    // const expectedBluePrintFilePath = path.join(exampleFolder, blueprintRelativeFilePath);

    // compareTexts(
    //     (await fs.readFile(actualBluePrintFilePath)).toString(),
    //     (await fs.readFile(expectedBluePrintFilePath)).toString(),
    //     'api-blueprint report',
    //     { ignore: /date:.*\s/g }
    // );
});

after(async () => {
    // process.chdir(cwd);
    chronicle.clear();
});

