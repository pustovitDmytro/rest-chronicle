import path from 'path';
import { assert } from 'chai';
import fs from 'fs-extra';
import axios from 'axios';
import { tmpFolder } from '../constants';
import  chronicle  from '../entry';
import { compareTexts } from '../utils';

const examplesDir = path.join(__dirname, '../../examples/');
const cwd = process.cwd();

suite('Weather Example');

before(async () => {
    await fs.ensureDir(tmpFolder);
    process.chdir(tmpFolder);
});

test('weather api', async function () {
    const exampleFolder = path.join(examplesDir, 'weather');
    const { scenario } = require(path.join(exampleFolder, 'client.js'));
    const app = require(path.join(exampleFolder, 'app.js')).default;

    const { port:appPort, server } = await new Promise((res) => {
        const s = app.listen(0, () => {
            const { port } = s.address();

            res({ port, server: s });
        });
    });

    for (const request of scenario) {
        const res = await axios({
            method  : request.method,
            url     : `http://localhost:${appPort}${request.url}`,
            data    : request.data,
            headers : request.headers
        });

        assert.exists(res.data);
    }
    await Promise.all(server._chronicles);

    const mdRelativeFilePath = './documentation/api.md';
    const actualmdFilePath = path.join(tmpFolder, mdRelativeFilePath);
    const expectedmdFilePath = path.join(exampleFolder, mdRelativeFilePath);

    compareTexts(
        (await fs.readFile(actualmdFilePath)).toString(),
        (await fs.readFile(expectedmdFilePath)).toString(),
        'lite.md report',
        { ignore: /date:.*\s/g }
    );
});

after(async () => {
    process.chdir(cwd);
    chronicle.clear();
});
