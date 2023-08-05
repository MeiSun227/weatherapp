const Koa = require('koa');

const app = new Koa();
const weatherRouter = require('./controller/weatherRouter')
const cors = require('kcors');

app.use(cors());

app.use(weatherRouter.routes());
app.use(weatherRouter.allowedMethods());


module.exports = app