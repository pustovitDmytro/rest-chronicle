import path from 'path';
import Base from  './TemplateReporter';

const templatePath = path.join(__dirname, '../../templates/reporters/lite.md');

export default class Lite extends Base {
    constructor(file) {
        super(file, { path: templatePath });
    }
}
