import express from 'express';
import chronicle, { middlewares } from '../../src';
import { citiesList, cityShow, cityUpdate, cityCreate, forecastsList, forecastUpdate } from './routes';

const port = 3000;
const chMid = middlewares.express(chronicle);
const app = express();
const router = express.Router();

router.get('/cities', chMid('Cities', 'Get list of cities'), citiesList);
router.get('/cities/:id', chMid('Cities', 'Get list of cities'), cityShow);
router.patch('/cities/:id', chMid('Cities', 'Update Existing City'), cityUpdate);
router.post('/cities/:id', chMid('Cities', 'Create new City'), cityCreate);
router.patch('/forecasts/:id', chMid('Forecasts', 'Update Forecast'), forecastUpdate);

// Use function in middleware for full controll
function customTitle(req) {
    return {
        group : 'Forecasts',
        title : req.query.cityId ? 'Forecasts for specific city' : 'Get list of forecasts'
    };
}
router.get('/forecasts', chMid(customTitle), forecastsList);

app.use('/api', router);

export default app;
app.listen(port, () => {
    console.log(`Weather server is running on ${port}`);
});
