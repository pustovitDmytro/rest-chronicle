import path from 'path';
import { execSync } from 'child_process';
import { assert } from 'chai';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { tmpFolder } from '../constants';
import  chronicle  from '../entry';

const examplesDir = path.join(__dirname, '../../examples/');
const docsDir = path.join(tmpFolder, 'blog-example');

suite('Blog Example #no-pack');

before(async function () {
    await fs.ensureDir(docsDir);
});


test('blog', async function () {
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
        { ...(await fs.readJSON(gotSwaggerFilePath)), servers: [] },
        { ...(await fs.readJSON(expectedSwagerFilePath)),  servers: [] },
        'swagger report'
    );

    const gotRamlFilePath = path.join(docsDir, 'raml.yaml');
    const expectedRamlFilePath = path.join(exampleFolder, './documentation/raml.yaml');
    const gotRamlContent = await fs.readFile(gotRamlFilePath).toString();
    const expectedRamlContent = await fs.readFile(expectedRamlFilePath).toString();

    assert.deepEqual(
        yaml.load(gotRamlContent),
        yaml.load(expectedRamlContent),
        'raml report'
    );
});

after(async function () {
    chronicle.clear();
});

