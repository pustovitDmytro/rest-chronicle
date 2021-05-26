import { entry } from './constants';

const M = require(entry);

export default M.default;

const { Chronicle, Action, Express, Axios, supertest, axios, reporters, middlewares } = M;

export { Chronicle, Action, Express, Axios, supertest, axios, reporters, middlewares };
