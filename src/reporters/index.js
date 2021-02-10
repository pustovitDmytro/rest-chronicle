import json from './JSONReporter';
import swagger from './Swagger';
import apiblueprint from './ApiBluePrint';
import lite from './Lite';
import raml from './Raml';

export {
    json,
    swagger,
    lite,
    apiblueprint,
    raml
};

export default {
    json,
    swagger,
    lite,
    raml,
    'api-blueprint' : apiblueprint
};
