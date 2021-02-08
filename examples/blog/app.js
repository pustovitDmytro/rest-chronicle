import jsonServer from 'json-server';

const port = process.env.PORT || 3002;

const posts = [ {
    'id'      : 1,
    'title'   : 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    'body'    : 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    thumbnail : null
},
{
    'id'      : 2,
    'title'   : 'qui est esse',
    'body'    : 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
    thumbnail : 'https://via.placeholder.com/150/24f355'
},
{
    'id'      : 3,
    'title'   : 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    'body'    : 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
    thumbnail : null
} ];

const comments = [ {
    'userId'   : 1,
    'id'       : 1,
    'title'    : 'delectus aut autem',
    'isEdited' : false
},
{
    'userId'   : 2,
    'id'       : 2,
    'title'    : 'quis ut nam facilis et officia qui',
    'isEdited' : true
},
{
    'userId'   : 1,
    'id'       : 3,
    'title'    : 'fugiat veniam minus',
    'isEdited' : false
},
{
    'userId'   : 5,
    'id'       : 4,
    'title'    : 'et porro tempora',
    'isEdited' : true
},
{
    'userId'   : 2,
    'id'       : 5,
    'title'    : 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    'isEdited' : false
} ];

const server = jsonServer.create();
const router = jsonServer.router({ posts, comments });

server.use(router);

if (!process.env.TEST) {
    server.listen(port, () => {
        console.log(`Blog server is running on ${port}`);
    });
}

export default server;
