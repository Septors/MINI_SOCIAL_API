import { decode } from "jsonwebtoken";
import * as token from "../utils/user.token.js"

export const decodedUserToken = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({message: "No token provided"});
    }

    const userToken = authHeader.split(" ")[1];

    const decoded = token.verifyToken(userToken,process.env.ACCESS_SECRET_TOKEN);

    req.id = decoded.id;
    req.role = decoded.role;


    next();
}