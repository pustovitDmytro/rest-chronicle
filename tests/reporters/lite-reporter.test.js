import Test, { fixtures } from '../Test';
import chronicle, { reporters, Action }  from '../entry';
import { compareTexts } from '../utils';

const Reporter = reporters.lite;

const factory = new Test(chronicle);

suite('lite reporter');

before(async () => {
    await factory.cleanup();
    await factory.setActions();
    await factory.setTmpFolder();
    chronicle.headers = {
        response : {
            include : []
        }
    };
});


test('Positive: lite template with one action', async function () {
    const action = factory.actions[0].data;
    const groups = { [action.context.group]: { [action.context.title]: [ action.id ] } };
    const reporter = new Reporter();
    const map = new Map([ [ action.id, action ] ]);

    await reporter._init();
    compareTexts(
        reporter._generate(groups, map),
        fixtures.reports.lite.createUser
    );
});

