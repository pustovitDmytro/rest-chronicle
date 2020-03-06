import Test, { fixtures } from '../Test';
import chronicle, { reporters, Action }  from '../entry';
import { compareTexts } from '../utils';

const Reporter = reporters['api-blueprint'];

const factory = new Test(chronicle);

suite('api-blueprint reporter');

before(async () => {
    await factory.cleanup();
    await factory.setActions();
    await factory.setTmpFolder();
});


test('Positive: api-blueprint template with one action', async function () {
    const action = factory.actions[0].data;
    const groups = { [action.context.group]: { [action.context.title]: [ action.id ] } };
    const reporter = new Reporter();
    const map = new Map([ [ action.id, action ] ]);

    await reporter._init();
    compareTexts(
        reporter._generate(groups, map),
        fixtures.reports.apiBlueprint.createUser
    );
});

