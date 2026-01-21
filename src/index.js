import Chronicle from './modules/Chronicle';
import Action from './modules/Action';
import Supertest from './requests/Supertest';
import Fetch from './requests/Fetch';
import Axios from './requests/Axios';
import Express from './requests/Express';
import reporters from './reporters';
import chronicle from './chronicle';

const middlewares = {
    express(instance = chronicle, ...params) {
        return new Express(instance, ...params);
    }
};

function supertest(app, instance = chronicle) {
    return new Supertest(app, instance);
}

const fetch = new Fetch(chronicle);

export default chronicle;
export {
    Chronicle,
    Action,
    Express,
    Axios,
    supertest,
    reporters,
    middlewares,
    fetch,
    Fetch,
    chronicle
};

