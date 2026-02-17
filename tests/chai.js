/* eslint-disable import/no-commonjs */
import chaiModule from 'chai';

/**
 * Custom Chai Plugin: equalInAnyOrder
 * Recursively compares objects, but sorts arrays before comparison.
 */
export default function chaiEqualInAnyOrder(chai, utils) {
    const { Assertion } = chai;

    // Helper to recursively sort arrays and object keys
    // eslint-disable-next-line unicorn/consistent-function-scoping
    function canonicalize(val) {
        if (Array.isArray(val)) {
            return val
                .map((element) => canonicalize(element))
                .sort((a, b) => {
                    const strA = JSON.stringify(a);
                    const strB = JSON.stringify(b);


                    return strA.localeCompare(strB);
                });
        }

        if (val !== null && typeof val === 'object') {
            const sortedObj = {};

            Object.keys(val).sort().forEach(key => {
                sortedObj[key] = canonicalize(val[key]);
            });

            return sortedObj;
        }


        return val;
    }

    Assertion.addMethod('equalInAnyOrder', function (expected, msg) {
        if (msg) utils.flag(this, 'message', msg);

        const actual = this._obj;

        const actualCanonical = canonicalize(actual);
        const expectedCanonical = canonicalize(expected);

        // Use Chai's internal equality check on the sorted versions
        this.assert(
            utils.eql(actualCanonical, expectedCanonical),
            'expected #{act} to equal #{exp} (ignoring array order)',
            'expected #{act} to not equal #{exp} (ignoring array order)',
            expectedCanonical,
            actualCanonical,
            true // show diff
        );
    });

    // Add to 'assert' interface
    // eslint-disable-next-line no-param-reassign
    chai.assert.equalInAnyOrder = (act, exp, msg) => {
        new Assertion(act).to.be.equalInAnyOrder(exp, msg);
    };
}

chaiModule.use(chaiEqualInAnyOrder);
