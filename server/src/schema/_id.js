const Joi = require("joi");

const objectIdSchema = Joi.object({
    id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
});

module.exports = { objectIdSchema };
