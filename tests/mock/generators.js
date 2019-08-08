import Chance from 'chance';

const chance = new Chance();
const METHODS = [ 'GET', 'PATCH', 'POST', 'PUT', 'OPTIONS', 'HEAD', 'DELETE' ];
const GROUPS = [ 'users', 'posts', 'externals', 'messages' ];
const TITLES = {
    users     : [ 'create user', 'update user', 'delete user', 'show user' ],
    posts     : [ 'create post', 'update post', 'delete post', 'show post' ],
    messages  : [ 'create message', 'update message', 'delete message', 'show message' ],
    externals : [ 'heath', 'info', 'help', 'contacts' ]
};

export function actionGenerate() {
    const method = chance.pickone(METHODS);
    const url = chance.url();
    const group = chance.pickone(GROUPS);
    const title = chance.pickone(TITLES[group]);
}

export function generateActions(count = 100, options = {}) {
    return Array.from(new Array(count)).map(() => actionGenerate());
}
