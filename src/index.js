import Chronicle from './modules/Chronicle';
import Action from './modules/Action';
import Supertest from './requests/Supertest';
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

export default chronicle;
export {
    Chronicle,
    Action,
    Express,
    Axios,
    supertest,
    reporters,
    middlewares
};

