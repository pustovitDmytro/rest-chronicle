/* eslint-disable unicorn/filename-case */
import { assert } from 'chai';
import Test from '../Test';
import chronicle, { Axios }  from '../entry';
import { mockAppUrl } from '../constants';


const factory = new Test(chronicle);
const axios = new Axios(chronicle);

suite('ECONNREFUSED');

before(async function () {
    await factory.cleanup();
    await factory.setActions();
    await factory.setTmpFolder();
});

test('Negative: axios ECONNREFUSED', async function () {
    const context = { title: 'ECONNREFUSED', group: 'Errors' };

    try {
        await axios({
            method : 'GET',
            url    : `${mockAppUrl}/api/users`,
            with   : context
        });
        assert.fail('should fail');
    } catch (error)  {
        assert.include(error.error.toString(), 'Error: connect ECONNREFUSED');
        const action = factory.findAction(context);

        assert.exists(action);
        assert.isEmpty(action._response);
    }
});

after(async function () {
    await factory.cleanup();
});
