import Test, { actions } from '../Test';
import chronicle, { reporters, Action }  from '../entry';
import { compareTexts } from '../utils';

const Reporter = reporters['api-blueprint'];

const factory = new Test(chronicle);

suite('api-blueprint reporter');

before(async () => {
    // await factory.cleanup();
    // await factory.setActions();
    await factory.setTmpFolder();
});


test('Positive: api-blueprint template with one action', async function () {
    const id = '0bb64f02-d631-55dc-9923-4382153df1b0';
    const action = new Action({ ...actions[0], chronicle, id }).data;
    const groups = { [action.context.group]: { [action.context.title]: id } };
    const reporter = new Reporter();
    const map = new Map([ [ id, action ] ]);

    await reporter._init();

    compareTexts(
        reporter._generate(groups, map),
        `FORMAT: 1A

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
        }`
    );
});

