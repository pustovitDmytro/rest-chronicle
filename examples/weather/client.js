import forecasts from './data/forecasts';
import cities from './data/cities';

const headers = {
    Authorization : '12345_privateKey_6789'
};

// clients will send next requests:
export const scenario = [
    { method: 'GET', url: '/api/cities', headers  },
    { method: 'GET', url: '/api/forecasts?cityId=8', headers  },
    { method: 'GET', url: `/api/cities/${cities[0].id}`, headers },
    { method: 'GET', url: '/api/cities', headers  },
    {
        method : 'PATCH',
        url    : `/api/cities/${cities[0].id}`,
        data   : cities[0],
        headers
    },
    { method: 'GET', url: '/api/forecasts?cityId=3', headers  },
    {
        method : 'POST',
        url    : '/api/cities',
        data   : cities[7],
        headers
    },
    { method: 'GET', url: '/api/forecasts', headers  },
    {
        method : 'PATCH',
        url    : `/api/forecasts/${forecasts[0].id}`,
        data   : forecasts[0],
        headers
    },
    {
        method : 'PATCH',
        url    : `/api/cities/${cities[6].id}`,
        data   : cities[6],
        headers
    }
];

// check documentation folder to see what will be captured
