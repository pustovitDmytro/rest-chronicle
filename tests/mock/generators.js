/* eslint-disable no-unused-vars */
import fatum from 'fatum';

const METHODS = [ 'GET', 'PATCH', 'POST', 'PUT', 'OPTIONS', 'HEAD', 'DELETE' ];
const GROUPS = [ 'users', 'posts', 'externals', 'messages' ];
const TITLES = {
    users     : [ 'create user', 'update user', 'delete user', 'show user' ],
    posts     : [ 'create post', 'update post', 'delete post', 'show post' ],
    messages  : [ 'create message', 'update message', 'delete message', 'show message' ],
    externals : [ 'heath', 'info', 'help', 'contacts' ]
};

export function actionGenerate() {
    const method = fatum.pick(METHODS);
    const url = fatum.domain();
    const group = fatum.pick(GROUPS);
    const title = fatum.pick(TITLES[group]);
}

export function generateActions(count = 100, options = {}) {
    return Array.from({ length: count }).map(() => actionGenerate());
}

export function AxiosCollection(baseUrl) {}

export function generateAxiosRequest(baseUrl, { method, query, path } = {}) {
    return {
        method : method.toUpperCase(),
        url    : baseUrl + path
    };
}
