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

server.use(router);

if (!process.env.TEST) {
    server.listen(port, () => {
        console.log(`Chat server is running on ${port}`);
    });
}

export default server;
