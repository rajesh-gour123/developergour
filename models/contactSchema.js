const Joi = require("joi");

module.exports.contactSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(5).max(1000).required()
});
