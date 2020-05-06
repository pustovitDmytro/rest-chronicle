import handleBars from 'handlebars';

handleBars.registerHelper('json', (data, offset) => {
    const shift = Array.from(new Array(offset), () => ' ').join('');
    const text = shift + JSON.stringify(data, null, 4 + offset);
    const rightShifted = text.slice(0, -1) + shift + text.slice(-1);

    return new handleBars.SafeString(rightShifted);
});

handleBars.registerHelper('findById', (map, id) => {
    return map.get(id);
});


export default handleBars;

