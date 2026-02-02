const Joi = require("joi");

const cartSchema = Joi.object({
    product: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    quantity: Joi.number().min(1).required(),
});

const updateCartSchema = Joi.object({
    product: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    quantity: Joi.number().min(1).required(),
});

const removeFromCartSchema = Joi.object({
    product: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
});

module.exports = { cartSchema, updateCartSchema, removeFromCartSchema };