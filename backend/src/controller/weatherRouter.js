const weatherRouter = require('koa-router')();
const fetch = require('node-fetch');
const config = require('../utils/config')

const fetchWeather = async (lat,lon) => {
    const endpoint = `${config.mapURI}/weather?lat=${lat}&lon=${lon}&appid=${config.appId}`;
    const response = await fetch(endpoint);
    return response ? response.json() : {}
};

weatherRouter.get('/api/weather', async ctx => {
    const lat = ctx.query.latitude;
    const lon= ctx.query.longitude;
    const weatherData = await fetchWeather(lat,lon);
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = weatherData.weather ? weatherData.weather[0] : {};
});

const fetchForecastWeather = async () => {
    const endpoint = `${config.mapURI}/forecast?q=${config.targetCity}&appid=${config.appId}&`;
    const response = await fetch(endpoint);
    return response ? response.json() : {}
};

weatherRouter.get('/api/forecast', async ctx => {
    const weatherData = await fetchForecastWeather();

    ctx.type = 'application/json; charset=utf-8';
    ctx.body = weatherData.list ? weatherData.list : {};
});

module.exports = weatherRouter