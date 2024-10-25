const Joi = require('joi');

// Validation pour la création d'une location
const rentalValidation = (data) => {
    const schema = Joi.object({
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        product: Joi.string().required(),
        user: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports = { rentalValidation };
