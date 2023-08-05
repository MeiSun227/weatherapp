const weatherRouter = require('koa-router')();
const fetch = require('node-fetch');
const config = require('../utils/config')

const fetchWeather = async () => {
    const endpoint = `${config.mapURI}/weather?q=${config.targetCity}&appid=${config.appId}&`;
    const response = await fetch(endpoint);

    return response ? response.json() : {}
};

weatherRouter.get('/api/weather', async ctx => {
    const weatherData = await fetchWeather();

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