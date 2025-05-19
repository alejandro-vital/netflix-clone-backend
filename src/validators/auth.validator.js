const Joi = require("joi");

// Validaciones reutilizables
const nameRule = Joi.string()
  .trim()
  .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
  .custom((value, helpers) => {
    const soloLetras = value.replace(/\s/g, "");
    if (soloLetras.length < 2) {
      return helpers.message("El nombre debe tener al menos 2 letras");
    }
    return value;
  })
  .required()
  .messages({
    "string.pattern.base": "El nombre solo puede contener letras y espacios",
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "any.required": "El nombre es obligatorio",
  });

const emailRule = Joi.string()
  .trim()
  .lowercase()
  .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/)
  .required()
  .messages({
    "string.pattern.base":
      "El correo solo puede contener letras, números, puntos, guiones bajos y medios, y debe tener un formato válido",
    "any.required": "El correo es obligatorio",
  });

const passwordRule = Joi.string()
  .min(6)
  .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
  .required()
  .messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "string.pattern.base": "La contraseña debe contener letras y números",
    "any.required": "La contraseña es obligatoria",
  });

// Schemas
const registerSchema = Joi.object({
  name: nameRule,
  email: emailRule,
  password: passwordRule,
});

const loginSchema = Joi.object({
  email: emailRule,
  password: passwordRule,
});

module.exports = { registerSchema, loginSchema };
