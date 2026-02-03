const Joi = require("joi");

const createOrderSchema = Joi.object({
    shippingAddress: Joi.object({
        fullName: Joi.string().required(),
        phone: Joi.string().required(),
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().optional(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        pincode: Joi.string().required(),
        country: Joi.string().optional(),
    }).required(),
});

const verifyPaymentSchema = Joi.object({
    orderId: Joi.string().required(),
    razorpayOrderId: Joi.string().required(),
    razorpayPaymentId: Joi.string().required(),
    razorpaySignature: Joi.string().required(),
});

module.exports = {createOrderSchema, verifyPaymentSchema};