import path from 'path';
import fs from 'fs-extra';
import handleBars from 'handlebars';
import Base from  './Base';

handleBars.registerHelper('json', (data, offset) => {
    const shift = Array.from(new Array(offset), () => ' ').join('');
    const text = shift + JSON.stringify(data, null, 4 + offset);
    const rightShifted = text.slice(0, -1) + shift + text.slice(-1);

    return new handleBars.SafeString(rightShifted);
});

handleBars.registerHelper('findById', (map, id) => {
    return map.get(id);
});
// const readmeTemplateText = mdinclude.readFileSync('templates/documentation/readme.md'); // eslint-disable-line no-sync
// const readmeTemplate = handleBars.compile(readmeTemplateText);
const templatePath = path.join(__dirname, '../../templates/reporters/api-blueprint.md');

export default class ApiBluePrint extends Base {
    _generate(groups, map) {
        return this._template({
            groups,
            actions : map
        });
    }
    async _init() {
        const templateContent = await fs.readFile(templatePath);

        this._template = handleBars.compile(templateContent.toString());
    }

    async write(actions) {
        await this._init();
        const { groups, map } = this._build(actions, { groupBy: [ 'request.path', 'request.method' ] });
        const content = this._generate(groups, map, actions);

        await fs.writeFile(this.file, content);
    }
}
