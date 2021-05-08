import path from 'path';

const isBuild = process.env.BUILD && [ '1', 'true' ].includes(process.env.BUILD);
const entry = process.env.ENTRY && path.resolve(process.env.ENTRY)
|| isBuild && path.resolve(__dirname, '../lib')
|| path.resolve(__dirname, '../src');

const tmpFolder = path.join(__dirname, '../tmp/tests');
const mockAppPort = 8193;
const mockAppUrl = `http://localhost:${mockAppPort}`;

export {
    tmpFolder,
    mockAppPort,
    mockAppUrl,
    entry
};
