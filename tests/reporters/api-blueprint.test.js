import Test, { actions } from '../Test';
import chronicle, { reporters, Action }  from '../entry';
import { compareTexts } from '../utils';

const Reporter = reporters['api-blueprint'];

const factory = new Test(chronicle);

suite('api-blueprint reporter');

before(async () => {
    await factory.setTmpFolder();
});


test('Positive: api-blueprint template with one action', async function () {
    const action = new Action({ ...actions[0], chronicle }).data;
    const groups = { [action.context.group]: { [action.context.title]: action.id } };
    const reporter = new Reporter();
    const map = new Map([ [ action.id, action ] ]);

    await reporter._init();
    const expected =  `
    FORMAT: 1A

    # Group Users

    ## create user [POST /users]

    + Request

    {
        "first_name": "Pascal",
        "last_name": "Ancell",
        "email": "pancell1@gravatar.com",
        "gender": "Male"
    }

    + Response 200 (application/json)


    + Headers

        x-powered-by: Express
        content-length: 120

    + Body

    {
        "id": 2,
        "first_name": "Pascal",
        "last_name": "Ancell",
        "email": "pancell1@gravatar.com",
        "gender": "Male"
    }`;

    compareTexts(
        reporter._generate(groups, map),
        expected
    );
});

