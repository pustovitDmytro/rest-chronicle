import forecasts from './data/forecasts';
import cities from './data/cities';

function getById(array, id) {
    return array.find(i => i.id === id);
}

export function citiesList(req, res) {
    res.send(cities);
}

export function cityShow(req, res) {
    res.send(getById(cities, +req.params.id));
}

export function cityUpdate(req, res) {
    res.send(req.body);
}

export function cityCreate(req, res) {
    res.send(req.body);
}

export function forecastsList(req, res) {
    res.send(
        forecasts.filter(i => req.query.cityId
            ? i.city === +req.query.cityId
            : true)
    );
}

export function forecastUpdate(req, res) {
    res.send(req.body);
}
