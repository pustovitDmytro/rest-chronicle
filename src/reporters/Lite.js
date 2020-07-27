import path from 'path';
import Base from  './TemplateReporter';

const templatePath = path.join(__dirname, '../../templates/reporters/lite.md');

export default class Lite extends Base {
    constructor(file, templateOptions = {}) {
        super(file, {
            path         : templatePath,
            templateOpts : {
                ...Lite.defaultTemplateOptions,
                ...templateOptions
            }
        });
    }

    static defaultTemplateOptions = {
        maxArrayLength  : 4,
        maxStringLength : 256,
        depth           : 8
    }
}
