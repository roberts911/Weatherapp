const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || '14e99d9e13ddb3f3ba1dc50ba34ecfc8';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
// const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async (lat, lon) => {
  const endpoint = `${mapURI}/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

router.get('/api/weather', async ctx => {
  const { lat, lon } = ctx.request.query;
  const weatherData = await fetchWeather(lat, lon);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData ? {
    id: weatherData.weather[0].id,
    main: weatherData.weather[0].main,
    description: weatherData.weather[0].description,
    icon: weatherData.weather[0].icon,
    temp: weatherData.main.temp,
    pressure: weatherData.main.pressure,
    feels_like: weatherData.main.feels_like,
    humidity: weatherData.main.humidity,
    windSpeed: weatherData.wind.speed,
    name: weatherData.name,
  } : {};
});

const fetchForecast = async (lat, lon) => {
  const endpoint = `${mapURI}/forecast?lat=${lat}&lon=${lon}&cnt=9&appid=${appId}&units=metric&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

router.get('/api/forecast', async ctx => {
  const { lat, lon } = ctx.request.query;
  const forecastData = await fetchForecast(lat, lon);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = forecastData.list ? forecastData.list : {}; // dostęp do listy prognoz
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
