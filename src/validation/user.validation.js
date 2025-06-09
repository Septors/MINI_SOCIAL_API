import Joi  from "joi";

export const registerValidation =  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$'))
        .message("Mininmum 8 word")
        .required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required(),

    });

export const loginValidation =  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$'))
        .required()
});

export const changePassword =  Joi.object({
    oldPassword: Joi.string()
        .pattern(new RegExp(`^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$`))
        .required(),
    newPassword: Joi.string()
        .pattern(new RegExp(`^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$`))
        .required()
});

