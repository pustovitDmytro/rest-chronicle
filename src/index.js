import Chronicle from './modules/Chronicle';
import Action from './modules/Action';
import Supertest from './requests/Supertest';
import Axios from './requests/Axios';
import reporters from './reporters';

const chronicle = new Chronicle();
const axios = new Axios(chronicle);

function supertest(app, instance = chronicle) {
    return new Supertest(app, instance);
}

export default chronicle;
export {
    Chronicle,
    Action,
    supertest,
    axios,
    reporters
};

