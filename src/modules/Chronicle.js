import Action from './Action';

export default class Chronicle {
    constructor() {
        this._actions = [];
    }
    action(title, group) {
        const action = new Action({
            title,
            group,
            chronicle : this
        });

        this._actions.push(action);
    }
}
