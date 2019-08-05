import { assert } from 'chai';
import chronicle  from '../entry';
import app from '../mock';

const request = require('supertest');


suite('Supertest');

test('Simple supertest GET request', async function () {
    await request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
            console.log('res: ', res);
        });
});


// import { Chronicle, axios, request } from 'rest-chronicle';

// const chronicle = new Chronicle({
//     version : 'v1',
//     prefix  : 'api/v1'
// });
// // const axios = new Axios({
// //     with     : 'mocha',
// //     instance : chronicle
// // });

// axios({
//     with         : this,
//     method       : 'get',
//     url          : 'http://bit.ly/2mTM3nY',
//     responseType : 'stream'
// });

// {
//     const action = chronicle.action('get users', 'Users');

//     action.url = 'http://localhost:8080/api/v1/users?status=ACTIVE';
//     action.response = {
//         headers : { 'content-type': 'application/json' },
//         code    : 200,
//         body    : []
//     };
//     // action.method = 'GET';
// }

// // methods
// // with
// // desc
// // comment
// // tag

// axios
//     .with(this)
//     .desc('additional descr')
//     .comment('some text')
//     .get('/user/12345');

// request
//     .with(this)
//     .get('/products')
//     .expect(200);

// // const instane1 = axios.create({
// //     baseURL : 'https://some-domain.com/api/',
// //     timeout : 1000,
// //     headers : { 'X-Custom-Header': 'foobar' }
// // });


// chronicle.save('filePath', {});
// chronicle.saveMany('groups_to_files', {});
// chronicle.clear();

