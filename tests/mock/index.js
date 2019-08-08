import jsonServer from 'json-server';
import users from './fixtures/users';

const server = jsonServer.create();
const router = jsonServer.router({ users });
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
    console.log('Mock server is running');
});

export default server;
export { users };
