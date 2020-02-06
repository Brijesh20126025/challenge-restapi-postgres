import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

const app = new Koa()
const PORT = process.env.PORT || 1337
const routes = require('./routes');
const { sequelize } = require('./models');

app.use(bodyParser());

sequelize.sync();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app
  .use(routes)
  .listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
  )
