import * as userService from "../service/user.service.js";
import ApiError from "../utils/ApiError.js";
import { setRefreshTokenCookie } from "../utils/cookie.js";


export const registerUser = async(req,res) =>{
        const {email,password} = req.body;

         const {user,accessToken,refreshToken} = await userService.createNewUser(res,email,password);

         await setRefreshTokenCookie(res,refreshToken);

         res.status(201).json({message: "User creted ",user,accessToken});
}

export const loginUser = async(req,res) =>{
    const{email,password} = req.body;

    const {user,accessToken} = await userService.loginUser(res,email,password);

    res.status(200).json({message: "Access saccessfuly",user,accessToken});
};

export const logout = async(req,res) =>{
    const headerToken = req.cookies.refreshToken;
    await userService.clearUserToken(res,headerToken,process.env.REFRESH_SECRET_TOKEN);

    res.status(200).json({message: "Logout successfully"});
};

export const changeUserPassword = async(req,res) => {
    const {oldPassword,newPassword} = req.body;

    const userId = req.id;

    await userService.changePassword(userId,oldPassword,newPassword);

    res.status(200).json({message: "Password has been changed"});
};


export const getRefreshToken = async (req,res) =>{
    const authToken = req.cookies.refreshToken;
    const userId = req.id;

    if(!authToken ){
        throw new ApiError(401,"Unauthorization. Token required");
    };

    const {accessToken,refreshToken} =  await userService.checkAndRefreshToken(userId,authToken);

    await setRefreshTokenCookie(res,refreshToken)

    res.status(200).json({message: "Token refreshed",accessToken});
};
