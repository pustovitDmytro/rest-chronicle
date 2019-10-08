import path from 'path';

const tmpFolder = path.join(__dirname, '../tmp/tests');
const mockAppPort = 8192;
const mockAppUrl = `http://localhost:${mockAppPort}`;

export {
    tmpFolder,
    mockAppPort,
    mockAppUrl
};
