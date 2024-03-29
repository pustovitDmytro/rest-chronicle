import express      from 'express';
import bodyParser   from 'body-parser';
import chronicle, { middlewares } from '../../src';
import { citiesList, cityShow, cityUpdate, cityCreate, forecastsList, forecastUpdate } from './routes';

const port = process.env.PORT || 3005;
const chr = middlewares.express(chronicle, {
    save : {
        uniqueFilter : [ 'context.title', 'request.method', 'response.status.code', 'url.path' ],
        files        : [ { reporter: 'lite', path: './documentation/api.md' } ]
    }
});

chronicle.setConfig({
    headers : {
        request : {
            include  : [ 'authorization' ],
            sanitize : {
                authorization : () => "'API KEY'"
            }
        },
        response : {
            include : []
        }
    }
});

const app = express();
const router = express.Router();

router.use(bodyParser.json());

router.get('/cities', chr('Cities', 'Get list of cities'), citiesList);
router.get('/cities/:id', chr('Cities', 'Get one city'), cityShow);
router.patch('/cities/:id', chr('Cities', 'Update Existing City'), cityUpdate);
router.post('/cities', chr('Cities', 'Create new City'), cityCreate);
router.patch('/forecasts/:id', chr('Forecasts', 'Update Forecast'), forecastUpdate);

// Use function in middleware for full controll
function customTitle(req) {
    return {
        group : 'Forecasts',
        title : req.query.cityId
            ? 'Forecasts for specific city'
            : 'Get list of forecasts'
    };
}

router.get('/forecasts', chr(customTitle), forecastsList);

app.use('/api', router);

export default app;

if (!process.env.TEST) {
    app.listen(port, () => {
        console.log(`Weather server is running on ${port}`);
    });
}
