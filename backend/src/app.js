const Koa = require('koa');
const cors = require('kcors');

const app = new Koa();
var options = {
  origin: '*'
};
app.use(cors(options));

const weatherRouter = require('./controller/weatherRouter');

app.use(weatherRouter.routes());
app.use(weatherRouter.allowedMethods());

module.exports = app;
