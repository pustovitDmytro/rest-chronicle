import { assert } from 'chai';
import chronicle  from '../entry';

suite('Actions');

test('Manually setting required attributes', function () {
    const action = chronicle.action({ title: 'get users', group: 'Users' });

    action.url = 'http://localhost:8080/api/users?status=ACTIVE';

    action.response = {
        headers : { 'content-type': 'application/json' },
        code    : 200,
        body    : []
    };

    const {
        request,
        response,
        context
    } = action.data;

    assert.equal(context.title, 'get users');
    assert.equal(context.group, 'Users');

    assert.deepEqual(request, {
        href     : 'http://localhost:8080/api/users?status=ACTIVE',
        origin   : 'http://localhost:8080',
        protocol : 'http:',
        hostname : 'localhost',
        port     : '8080',
        path     : '/api/users',
        query    : { status: 'ACTIVE' },
        method   : 'GET',
        headers  : {}
    });

    assert.deepOwnInclude(response, {
        headers : { 'content-type': 'application/json' },
        'http'  : {
            'version' : '1.1'
        },
        'info' : {
            'charset' : 'utf-8',
            'type'    : 'application/json'
        },
        'status' : {
            'code'    : 200,
            'message' : 'OK'
        },
        body : []
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

