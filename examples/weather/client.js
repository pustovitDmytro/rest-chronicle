// import forecasts from './data/forecasts';
import cities from './data/cities';

// clients will send next requests:
export const scenario = [
    { method: 'GET', url: '/api/cities' },
    { method: 'GET', url: `/api/cities/${cities[0].id}` },
    {
        method : 'PATCH',
        url    : `/api/cities/${cities[0].id}`,
        data   : cities[0]
    }
];

// check documentation folder to see what will be captured
