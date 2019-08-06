import Action from './Action';

export default class Chronicle {
    action(title, group) {
        return new Action({
            title,
            group,
            chronicle : this
        });
    }
}
