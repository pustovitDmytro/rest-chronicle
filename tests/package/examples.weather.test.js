import path from 'path';
import Mocha from 'mocha';
import { assert } from 'chai';
import fs from 'fs-extra';
import axios from 'axios';
import { tmpFolder } from '../constants';
import  chronicle  from '../entry';
import { compareTexts } from '../utils';

const mocha = new Mocha({
    'ui' : 'qunit'
});
const examplesDir = path.join(__dirname, '../../examples/');
const cwd = process.cwd();

suite('Weather Example');

before(async () => {
    await fs.ensureDir(tmpFolder);
    process.chdir(tmpFolder);
});

test.only('weather', async function () {
    const exampleFolder = path.join(examplesDir, 'weather');
    const { scenario } = require(path.join(exampleFolder, 'client.js'));
    const app = require(path.join(exampleFolder, 'app.js')).default;

    const appPort = await new Promise((res) => {
        const server = app.listen(0, () => {
            const { port } = server.address();

            res(port);
        });
    });

    for (const request of scenario) {
        console.log(request.method, request.url);
        await axios({
            method : request.method,
            url    : `http://localhost:${appPort}${request.url}`,
            data   : request.data
        });
    }

    // mocha.addFile(exampleTestFile);
    // await new Promise((res, rej) => {
    //     mocha.run(function (failures) {
    //         if (failures > 0) {
    //             return rej(new Error(JSON.stringify({ failures })));
    //         }
    //         res();
    //     });
    // });

    // const swaggerRelativeFilePath = './documentation/swagger.json';
    // const gotSwaggerFilePath = path.join(tmpFolder, swaggerRelativeFilePath);
    // const expectedSwagerFilePath = path.join(exampleFolder, swaggerRelativeFilePath);

    // assert.deepEqual(
    //     { ...require(gotSwaggerFilePath), servers: [] },
    //     { ...require(expectedSwagerFilePath),  servers: [] },
    //     'swagger report'
    // );

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
    process.chdir(cwd);
    chronicle.clear();
});
