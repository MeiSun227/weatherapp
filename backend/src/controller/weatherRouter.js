const weatherRouter = require('koa-router')();
const fetch = require('node-fetch');
const config = require('../utils/config');

const fetchWeather = async (lat, lon) => {
  const endpoint = `${config.mapURI}/weather?lat=${lat}&lon=${lon}&appid=${config.appId}`;
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

weatherRouter.get('/api/weather', async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  const defaultLat = 60.22972341850283;
  const defaultLon = 24.851251333955624;
  const latitude = ctx.query.latitude ? ctx.query.latitude : defaultLat;
  const longitude = ctx.query.longitude ? ctx.query.longitude : defaultLon;
  const weatherData = await fetchWeather(latitude, longitude);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
});

const fetchForecastWeather = async (latitude, longitude) => {
  const endpoint = `${config.mapURI}/forecast?lat=${latitude}&lon=${longitude}&cnt=4&appid=${config.appId}&`;
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

weatherRouter.get('/api/forecast', async ctx => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  const defaultLat = 60.22972341850283;
  const defaultLon = 24.851251333955624;
  const latitude = ctx.query.latitude ? ctx.query.latitude : defaultLat;
  const longitude = ctx.query.longitude ? ctx.query.longitude : defaultLon;
  const weatherData = await fetchForecastWeather(latitude, longitude);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData?.list ? weatherData?.list : {};
});

module.exports = weatherRouter;
