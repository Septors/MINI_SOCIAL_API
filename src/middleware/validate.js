import Joi from "joi";
import ApiError from "../utils/ApiError.js";

export const validate = (schema) => (req,res,next) =>{

    const{error,value} =   schema.validate(req.body);
    if(error){throw new ApiError(422,"Incorrect  value")};

    req.body = value;

    next();
};