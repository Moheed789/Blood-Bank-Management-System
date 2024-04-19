const Joi = require("joi");

const schema = Joi.object({
    name: Joi.string().required(),
    husbandName: Joi.string(),
    fatherName: Joi.string(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
});

exports.createEmployBodyValidate = (inputData) => {
    return schema.validate(inputData);
};