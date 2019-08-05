import { assert } from 'chai';
import { supertest } from '../entry';
import app, { users } from '../mock';

suite.only('Supertest');

test('Supertest usage without chronicle', async function () {
    const request = supertest(app);

    await request
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            assert.isArray(body);
            assert.isNotEmpty(body);
            assert.deepEqual(body, users);
        });
});

test('Supertest getOne request with chronicle', async function () {
    const request = supertest(app);

    await request
        .with({ title: 'r', group: 1 })
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            assert.isArray(body);
            assert.isNotEmpty(body);
            assert.deepEqual(body, users);
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

