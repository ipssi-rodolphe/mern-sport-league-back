const Joi = require('joi');

// Validation pour la création et la mise à jour d'une catégorie
const categoryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        description: Joi.string().max(500).optional()
    });
    return schema.validate(data);
};

module.exports = { categoryValidation };
