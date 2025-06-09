import jwt from "jsonwebtoken";

export const  generateTokens = (upload) =>{
    const accessToken = jwt.sign(upload,process.env.ACCESS_SECRET_TOKEN,{expiresIn:"1d"});

     const refreshToken = jwt.sign(upload,process.env.REFRESH_SECRET_TOKEN,{expiresIn:"7d"});

     return {accessToken,refreshToken};
};

export const verifyToken = (token,typeToken) =>{

    return jwt.verify(token,typeToken);
};