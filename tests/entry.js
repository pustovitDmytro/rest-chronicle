/* eslint-disable security/detect-non-literal-require */
import { entry } from './constants';

const Module = require(entry);

export default module;
module.exports = Module;


const { Chronicle, Action, Express, Axios, supertest, axios, reporters, middlewares } = Module;

export { Chronicle, Action, Express, Axios, supertest, axios, reporters, middlewares };
