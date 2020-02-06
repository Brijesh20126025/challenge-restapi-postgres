import Router from 'koa-router'
const router = new Router()
const pricesRouter = require('./pricingmodel.route');

router
    .get('/', (ctx, next) => {
        ctx.body = 'hello world';
    })

router.use('/prices', pricesRouter);

module.exports = router.routes();
