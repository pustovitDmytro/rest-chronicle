import Chronicle from './modules/Chronicle';
import Action from './modules/Action';
import Supertest from './requests/Supertest';
import Axios from './requests/Axios';
import Express from './requests/Express';
import reporters from './reporters';

const chronicle = new Chronicle();
const axios = new Axios(chronicle);
const middlewares = {
    express(instance = chronicle) {
        return new Express(instance);
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
    supertest,
    axios,
    reporters,
    middlewares
};

