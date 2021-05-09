import fs from 'fs-extra';
import handleBars from '../handlebars';
import Base from  './Base';

export default class TemplateReporter extends Base {
    constructor(file, { path, templateOpts = {} } = {}) {
        super(file);
        this.templatePath = path;
        this.templateOpts = templateOpts;
    }

    _generate(groups, map) {
        return this._template({
            groups,
            actions : map,
            options : this.templateOpts
        });
    }

    async _init() {
        const templateContent = await fs.readFile(this.templatePath);

        this._template = handleBars.compile(templateContent.toString(), { preventIndent: true });
    }

    async write(actions) {
        await this._init();
        const { groups, map } = this._build(actions, { groupBy: [ 'context.group', 'context.title' ] });
        const content = this._generate(groups, map, actions);

        await fs.writeFile(this.file, content);
    }
}
