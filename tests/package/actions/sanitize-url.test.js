import { assert } from 'chai';
import chronicle from '../../entry';

suite('Actions - URL Sanitization');

afterEach(function () {
    chronicle.clear();
});

test('Sanitize URL path using a function', function () {
    chronicle.setConfig({
        sanitizeURLPath : (path) => path.replace('/v1/', '/latest/')
    });

    const action = chronicle.action({ title: 'get users' });

    action.url = 'http://localhost:8080/api/v1/users';

    // Fill required response data to make .data valid
    action.response = { code: 200 };

    assert.equal(action.data.request.path, '/api/latest/users');
});

test('Sanitize URL path using declarative object (Strings & Regex)', function () {
    chronicle.setConfig({
        sanitizeURLPath : {
            // Simple string replacement
            '/api/v1' : '/api/v2',

            // UUID replacement
            [/[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}/gi] : ':id',

            // Integer ID replacement (trailing digits)
            [/\/\d+$/g] : '/:num'
        }
    });

    // Test 1: String replacement
    // eslint-disable-next-line censor/no-swear
    const actionStr = chronicle.action({ title: 'version bump' });

    actionStr.url = 'http://localhost/api/v1/status';
    actionStr.response = { code: 200 };
    assert.equal(actionStr.data.request.path, '/api/v2/status');

    // Test 2: UUID replacement
    const actionUUID = chronicle.action({ title: 'get doc' });

    actionUUID.url = 'http://localhost/api/v1/documents/6f7aa936-6263-4bd8-900c-55c233d35322';
    actionUUID.response = { code: 200 };
    // Note: /api/v1 becomes /api/v2 AND UUID becomes :id
    assert.equal(actionUUID.data.request.path, '/api/v2/documents/:id');

    // Test 3: Integer replacement
    const actionInt = chronicle.action({ title: 'get item' });

    actionInt.url = 'http://localhost/api/v1/items/500';
    actionInt.response = { code: 200 };
    assert.equal(actionInt.data.request.path, '/api/v2/items/:num');
});

test('Should return original path if no sanitizer is configured', function () {
    // config is empty by default after setup hook
    const action = chronicle.action({ title: 'raw path' });

    action.url = 'http://localhost/api/v1/users/123';
    action.response = { code: 200 };

    assert.equal(action.data.request.path, '/api/v1/users/123');
});

test('Should handle complex paths with multiple replacements', function () {
    chronicle.setConfig({
        sanitizeURLPath : {
            [/[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}/gi] : ':uuid',
            [/\d+/g]                                       : ':id'
        }
    });

    const action = chronicle.action({ title: 'nested resources' });
    // path: /users/123/docs/uuid-string

    action.url = 'http://localhost/users/456/docs/e7ace97c-a390-41f4-bd37-ce77a8b6ba90';
    action.response = { code: 200 };

    assert.equal(action.data.request.path, '/users/:id/docs/:uuid');
});
