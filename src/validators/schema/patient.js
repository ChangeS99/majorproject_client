import Joi from 'joi';

const admittedNestedSchema = Joi.object().keys({
    day: Joi.number()
        .min(1)
        .max(31)
        .required(),
    month: Joi.number()
        .min(1)
        .max(12)
        .required(),
    year: Joi.number()
        .min(1950)
        .max(2300)
        .required(),
    hour: Joi.number()
        .min(0)
        .max(23)
        .required(),
    minute: Joi.number()
        .min(0)
        .max(59)
        .required()

}).required();

const dischargedNestedSchema = Joi.object().keys({
    day: Joi.number()
        .min(1)
        .max(31)
        .required(),
    month: Joi.number()
        .min(1)
        .max(12)
        .required(),
    year: Joi.number()
        .min(1950)
        .max(2300)
        .required(),
    hour: Joi.number()
        .min(0)
        .max(23)
        .required(),
    minute: Joi.number()
        .min(0)
        .max(59)
        .required()

})
    .optional().allow({})

export const patientCreateSchema = Joi.object({
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
        .required()
        .email({ tlds: { allow: false } })
        .custom((value, helper) => {
            if (!value.endsWith('@gmail.com')) {
                return helper.message("please entera a valid email")

            } else {
                return true
            }
        }),
    department: Joi.string()
        .max(30)
        .required()
        .trim(),
    diagnosis: Joi.string()
        .max(100)
        .trim()
        .optional()
        .allow(''),
    admitted: admittedNestedSchema,
    discharged: dischargedNestedSchema
})