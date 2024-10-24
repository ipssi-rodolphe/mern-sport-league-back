const Joi = require('joi');

// Validation pour la création et la mise à jour d'un produit
const productValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        description: Joi.string().max(500).required(),
        available: Joi.boolean().required(),
        rentalPrice: Joi.number().required(),
        category: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports = { productValidation };
