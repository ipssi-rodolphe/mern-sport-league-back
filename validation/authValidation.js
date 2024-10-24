const Joi = require('joi');

// Schéma de validation pour l'inscription
const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(255).required(),
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

// Schéma de validation pour la connexion
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
