import { entry } from './constants';

const M = require(entry);

export default M.default;

const { Chronicle, Action, Express, Axios, supertest, axios, reporters, middlewares, Fetch } = M;

export { Chronicle, Action, Express, Axios, supertest, axios, reporters, middlewares, Fetch };
