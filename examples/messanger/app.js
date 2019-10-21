import jsonServer from 'json-server';

const port = 3000;
const users = [ {
    'id'    : 1,
    'name'  : 'Leigh',
    'email' : 'helvy0@feedburner.com'
}, {
    'id'    : 2,
    'name'  : 'Ancell',
    'email' : 'pancell1@gravatar.com'
}, {
    'id'    : 3,
    'name'  : 'Conre',
    'email' : 'lconre2@ezinearticles.com'
} ];

const messages = [ {
    text   : 'butter property president flow nodded degree where keep',
    sender : 2
}, {
    text   : 'cheese tried dig interior watch tone time train living',
    sender : 1
} ];

const server = jsonServer.create();
const router = jsonServer.router({ users, messages });
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(port, () => {
    console.log(`Mock server is running on ${port}`);
});

export default server;
