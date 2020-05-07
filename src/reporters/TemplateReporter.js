import fs from 'fs-extra';
import handleBars from '../handlebars';
import Base from  './Base';

export default class TemplateReporter extends Base {
    constructor(file, { path } = {}) {
        super(file);
        this.templatePath = path;
    }
    _generate(groups, map) {
        return this._template({
            groups,
            actions : map
        });
    }
    async _init() {
        const templateContent = await fs.readFile(this.templatePath);

        this._template = handleBars.compile(templateContent.toString());
    }

    async write(actions) {
        await this._init();
        const { groups, map } = this._build(actions, { groupBy: [ 'context.group', 'context.title' ] });
        const content = this._generate(groups, map, actions);

        await fs.writeFile(this.file, content);
    }
}
