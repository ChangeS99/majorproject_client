import Joi from 'joi';

const timingNestedSchema = Joi.object().keys({
    hour: Joi.number()
        .min(0)
        .max(23)
        .required(),
    minute: Joi.number()
        .min(0)
        .max(59)
        .required()

}).required()

export const employeeCreateSchema = Joi.object({
    firstName: Joi.string()
        .max(30)
        .min(1)
        .required()
        .trim(),
    middleName: Joi.string()
        .allow("")
        .optional()
        .max(30)
    ,
    lastName: Joi.string()
        .max(30)
        .min(1)
        .required()
        .trim(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .custom((value, helper) => {
            if (!value.endsWith('@gmail.com')) {
                return helper.message("please entera a valid email")

            } else {
                return true
            }
        }),
    role: Joi.string()
        .max(30)
        .required()
        .trim(),
    department: Joi.string()
        .max(30)
        .required()
        .trim(),
    joined: Joi.date().required(),
    arrival: timingNestedSchema,
    leaving: timingNestedSchema
})