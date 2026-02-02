const Joi = require("joi");

const productSchema = Joi.object({
	name: Joi.string().required(),
	price: Joi.number().required(),
	description: Joi.string().required(),
	image: Joi.string().required(),
	category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
});


module.exports = productSchema;
