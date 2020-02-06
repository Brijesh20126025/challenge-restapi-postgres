import Router from 'koa-router'
const router = new Router()
const prices = require('../../prices.json');
const controller = require('../controller/pricingmodel.controller');
router
    .get('/', controller.getAllPricingModels)
    .post('/', controller.createPricingModel)
    .get('/:pmid', controller.getPricingModelById)
    .put('/:pmid', controller.updatePricingModelById)
    .get('/:pmid/prices', controller.getPricesByPricingModelId)
    .post('/:pmid/prices', controller.addPriceByPricingModelId)
    .delete('/:pmid/prices/:priceid', controller.removePriceByPricingModelId)
    ;

module.exports = router.routes();
