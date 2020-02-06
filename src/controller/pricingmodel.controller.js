const db = require('../models');
const prices = require('../../prices.json');

exports.getAllPricingModels = async (ctx, next) => {
    try {
        const pricingModels = await db['pricing_model'].findAll();
        const response = pricingModels.reduce((oldValue, pricingModel) => {
            oldValue[pricingModel.id] = pricingModel;
            return oldValue;
        }, {});
        response['default_pricing'] = prices['default_pricing'];
        ctx.body = response;
    } catch (error) {
        ctx.body = error.message;
        ctx.status = 400;
    }
}

exports.getPricingModelById = async (ctx, next) => {
    try {
        const id = ctx.params['pmid'];
        const pricingModel = await db['pricing_model'].findByPk(id);
        if (!pricingModel) {
            ctx.status = 404;
            throw new Error('No pricing model found!');
        }
        ctx.body = pricingModel;
    } catch (error) {
        ctx.body = error.message;
    }
}

exports.getPricesByPricingModelId = async (ctx, next) => {
    try {
        const id = ctx.params['pmid'];
        const pricingModel = await db['pricing_model'].findOne({
            where: { id },
            attributes: ['pricing']
        });
        if (!pricingModel || !pricingModel.pricing) {
            ctx.status = 404;
            throw new Error('No pricing model found!');
        }
        ctx.body = pricingModel.pricing;
    } catch (error) {
        ctx.body = error.message;
    }
}

exports.addPriceByPricingModelId = async (ctx, next) => {
    try {
        const id = ctx.params['pmid'];
        const body = ctx.request.body;
        console.log('body', body);
        const pricingModel = await db['pricing_model'].update(
            { 'pricing': db.sequelize.fn('array_append', db.sequelize.col('pricing'), JSON.stringify(body)) },
            { 'where': { id } }
        );
        if (pricingModel[0] <= 0) {
            ctx.status = 404;
            throw new Error('No pricing model found!');
        }
        ctx.body = 'Pricing configuration Added successfully!';
    } catch (error) {
        ctx.body = error.message;
    }
}

exports.removePriceByPricingModelId = async (ctx, next) => {
    try {
        const id = ctx.params['pmid'];
        const priceId = ctx.params['priceid'];
        const body = ctx.request.body;
        console.log('body', body);
       // const [indexes, meta] = await db.sequelize.query(`select (position-1) as position from pricing_model, jsonb_array_elements(array_to_json("pricing")::jsonb) with ordinality arr(elem, position) WHERE elem->>'price' = '${priceId}' and id='${id}';`);
        // const pricingModel = await db['pricing_model'].update(
        //     { 'pricing': db.sequelize.fn('array_remove', db.sequelize.col('pricing'), db.sequelize.col(`pricing[:${indexes[0].position}]`)) },
        //     { 'where': { id } }
        // );

        //const [pricingModel] = await db.sequelize.query(`update pricing_model set pricing= array_remove('pricing', pricing[:${indexes[0].position}]) WHERE id='${id}'`);
        // const [data, meta] = await db.sequelize.
        //     query(`UPDATE pricing_model SET pricing #- '{pricing,0}'::jsonb[];`)
        //         // query(`UPDATE pricing_model SET pricing = jsonb_set(array_to_json(pricing), 
        //         // ('price') - 10::integer)`
        //         // (select position-1 from pricing_model, jsonb_array_elements(pricing->'price') 
        //         // with ordinality arr(elem, position) WHERE elem->>'price' = '10')::int );`);
        //     );
        // if (pricingModel[0] <= 0) {
        //     ctx.status = 404;
        //     throw new Error('No pricing model found!');
        // }
		
		
		
		// Use destory method to delete an entry from the pricing model.
		const pricingModel = await db['pricing_model'].destory({ where : {id : id} });
		
		
		
        console.log('deleted body', pricingModel);
        ctx.body = pricingModel;
    } catch (error) {
        ctx.body = error.message;
    }
}

exports.updatePricingModelById = async (ctx, next) => {
    try {
        const pmId = ctx.params['pmid'];
        const body = ctx.request.body;
        const { id, pricing, ...rest } = body;
        const pricingModel = await db['pricing_model'].update({ rest }, { where: { id: pmId } });
        if (pricingModel[0] <= 0) {
            ctx.status = 404;
            throw new Error('No pricing model found!');
        }
        ctx.body = pricingModel;
    } catch (error) {
        ctx.body = error.message;
    }
}

exports.createPricingModel = async (ctx, next) => {
    try {
        const body = ctx.request.body;
        const data = await db['pricing_model'].create(body);
        ctx.status = 201;
        ctx.body = data.id;
    } catch (error) {
        ctx.status = 500;
        ctx.body = error.message;
    }
}

