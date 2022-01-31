import path from 'path';
import jsonServer from 'json-server';
import fse from 'fs-extra';
import * as fixtures from './fixtures';

const filesDir = path.join(__dirname, './files');

const { users, actions } = fixtures;
const badCode = 404;

function createMockApp() {
    const server = jsonServer.create();
    const router = jsonServer.router({ users });
    const middlewares = jsonServer.defaults();

    server.use(middlewares);

    server.start = async function (port) {
        let app;

        server.use('/api', router);
        server.post('/format/:format', async (req, res) => {
            if (req.params.format === 'xml') {
                res.type('application/xml');

                return res.send('<status>OK</status>');
            }

            if (req.params.format === 'Buffer') {
                const content = await fse.readFile(path.join(filesDir, '1.txt'));

                res.writeHead(200, {
                    'Content-Type'        : 'mimetype',
                    'Content-disposition' : 'attachment;filename=1.txt',
                    'Content-Length'      : content.length
                });

                return res.end(Buffer.from(content, 'binary'));
            }

            res.sendStatus(badCode);
        });

        await new Promise(res => {
            app = server.listen(port, res);
        });

        return app;
    };

    return server;
}

export default createMockApp;
export { fixtures, actions };

