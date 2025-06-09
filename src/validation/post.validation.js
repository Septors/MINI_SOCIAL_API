import { text } from "express";
import Joi from "joi";

export const postSchema =  Joi.object({
    title: Joi.string().required(),
    image: Joi.string().uri().optional(),
    text: Joi.string().required()
});


export const changePostSchema =  Joi.object({
    title: Joi.string().optional(),
    image: Joi.string().uri().optional(),
    text: Joi.string().optional()
})