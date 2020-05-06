import path from 'path';

const tmpFolder = path.join(__dirname, '../tmp/tests');
const mockAppPort = 8193;
const mockAppUrl = `http://localhost:${mockAppPort}`;

export {
    tmpFolder,
    mockAppPort,
    mockAppUrl
};
