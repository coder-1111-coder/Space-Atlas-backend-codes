const Joi = require("joi");

/**
 * Joi Validation Schemas for CelestialBody
 */
const celestialBodySchemas = {
    create: Joi.object({
        name: Joi.string().trim().min(1).max(200).required().messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 1 character",
            "string.max": "Name cannot exceed 200 characters"
        }),
        type: Joi.string()
            .valid("Planet", "Moon", "Asteroid", "Comet", "Dwarf Planet", "Other")
            .required()
            .messages({
                "any.only": "Type must be one of: Planet, Moon, Asteroid, Comet, Dwarf Planet, Other",
                "any.required": "Type is required"
            }),
        description: Joi.string().trim().min(10).max(2000).required().messages({
            "string.empty": "Description is required",
            "string.min": "Description must be at least 10 characters",
            "string.max": "Description cannot exceed 2000 characters"
        }),
        discoveryDate: Joi.date().iso().allow(null).optional().messages({
            "date.format": "Discovery date must be a valid ISO date"
        }),
        discoveredBy: Joi.string().trim().max(200).allow("").optional()
    }),

    update: Joi.object({
        name: Joi.string().trim().min(1).max(200).optional(),
        type: Joi.string()
            .valid("Planet", "Moon", "Asteroid", "Comet", "Dwarf Planet", "Other")
            .optional(),
        description: Joi.string().trim().min(10).max(2000).optional(),
        discoveryDate: Joi.date().iso().allow(null).optional(),
        discoveredBy: Joi.string().trim().max(200).allow("").optional()
    }).min(1).messages({
        "object.min": "At least one field must be provided for update"
    })
};

/**
 * Validation Middleware Factory
 */
const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }

        req.body = value; // Use sanitized/validated data
        next();
    };
};

module.exports = {
    celestialBodySchemas,
    validate
};
