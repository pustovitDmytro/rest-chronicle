import { URL } from 'url';

function getQuery(searchParams) {
    const query = {};

    searchParams.forEach((value, name) => {
        query[name] = value;
    });

    return query;
}

class Action {
    constructor(config) {
        this._title = config.title;
        this._group = config.group;
        this._chronicle = config.chronicle;
        this._response = {};
        this._request = {};
    }

    set url(value) {
        this._url = new URL(value);
    }

    set response(value) {
        this._response = value;
    }

    get request() {
        return {
            href     : this._url.href,
            origin   : this._url.origin,
            protocol : this._url.protocol,
            hostname : this._url.hostname,
            port     : this._url.port,
            path     : this._url.pathname,
            query    : getQuery(this._url.searchParams),

            method  : this._method || 'GET',
            headers : this._request.headers || {}
        };
    }

    get data() {
        return {
            title    : this._title,
            group    : this._group,
            request  : this.request,
            response : this._response
        };
    }
}

export default class Chronicle {
    action(title, group) {
        return new Action({
            title,
            group,
            chronicle : this
        });
    }
}
