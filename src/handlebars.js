import { inspect } from 'util';
import { isEmpty } from 'myrmidon';
import handleBars from 'handlebars';

handleBars.registerHelper('json', (data, offset) => {
    const shift = Array.from(new Array(offset), () => ' ').join('');
    const text = shift + JSON.stringify(data, null, 4 + offset);
    const rightShifted = text.slice(0, -1) + shift + text.slice(-1);

    return new handleBars.SafeString(rightShifted);
});

handleBars.registerHelper('inspect', (data, options) => {
    const text = inspect(data, options);

    return new handleBars.SafeString(text);
});

handleBars.registerHelper('findById', (map, id) => {
    return map.get(id);
});

handleBars.registerHelper({
    // eq  : (v1, v2) => v1 === v2,
    // ne  : (v1, v2) => v1 !== v2,
    // lt  : (v1, v2) => v1 < v2,
    // gt  : (v1, v2) => v1 > v2,
    // lte : (v1, v2) => v1 <= v2,
    // gte : (v1, v2) => v1 >= v2,
    // and() {
    //     return Array.prototype.every.call(arguments, Boolean);
    // },
    // or() {
    //     return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    // },
    // isEmpty  : v => isEmpty(v),
    notEmpty : v => v && !isEmpty(v)
});

export default handleBars;

