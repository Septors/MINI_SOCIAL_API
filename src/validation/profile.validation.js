import Joi  from "joi";

export const profileValidate =  Joi.object({
    avatar: Joi.string().uri().optional(),
    name: Joi.string().required(),
    abount: Joi.string().optional(),
});

export const changeProfileValidate =  Joi.object({
    avatar: Joi.string().uri().optional(),
    name: Joi.string().optional(),
    about: Joi.string().optional()

})