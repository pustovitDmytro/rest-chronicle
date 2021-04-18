import jsonServer from 'json-server';
import * as fixtures from './fixtures';

const { users, actions } = fixtures;

function createMockApp() {
    const server = jsonServer.create();
    const router = jsonServer.router({ users });
    const middlewares = jsonServer.defaults();

    server.use(middlewares);

    server.start = async function (port) {
        let app;

        server.use('/api', router);
        server.post('/format/:format', (req, res) => {
            if (req.params.format === 'xml') {
                res.type('application/xml');

                return res.send('<status>OK</status>');
            }
            res.sendStatus(404);
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

