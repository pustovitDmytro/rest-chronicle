import path from 'path';
import Base from  './TemplateReporter';

const templatePath = path.join(__dirname, '../../templates/reporters/api-blueprint.md');

export default class ApiBluePrint extends Base {
    constructor(file) {
        super(file, { path: templatePath });
    }
}
