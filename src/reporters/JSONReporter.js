import fs from 'fs-extra';
import Base from './Base';
import { DEFAULT_JSON_OFFSET } from '../constants';
export default class JSONReporter extends Base {
    _generate(groups, map) {
        const injected = Object.keys(groups)
            .map(groupName => ({
                group  : groupName,
                titles : Object.keys(groups[groupName])
                    .map(title => ({
                        name    : title,
                        actions : groups[groupName][title]
                            .map(id => map.get(id))
                            .map(action => ({
                                request  : action.request,
                                response : action.response
                            }))
                    }))
            }));

        return JSON.stringify(injected, null, DEFAULT_JSON_OFFSET);
    }

    async write(actions) {
        const { groups, map } = this._build(actions);
        const content = this._generate(groups, map);

        await fs.writeFile(this.file, content);
    }
}
