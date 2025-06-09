import prisma from "../lib/prisma.client.js";
import * as hashPassword from "../utils/password.js"
import * as jwtToken from "../utils/user.token.js"
import { setRefreshTokenCookie } from "../utils/cookie.js";
import ApiError from "../utils/ApiError.js";



export const checkEmail = async(email) =>{

         const user = await prisma.user.findFirst({
            where:{
                email:email,
            }
        });
        return user;
};

export const createNewUser = async(res,email,password) =>{

        const existEmail = await checkEmail(email);

        if(existEmail){throw new ApiError(404,"Email is alreafy existing")};

        const hashedPassword = await hashPassword.hashingPassword(password);

        const user = await prisma.user.create({
            data:{
                email:email,
                password:hashedPassword,
            }
        })

        const {accessToken,refreshToken} = jwtToken.generateTokens({id:user.id,role:user.role});

        await prisma.user.update({
            where:{id:user.id},
            data:{
                currentRefreshToken:refreshToken
            }
        });
        
        return {user,refreshToken,accessToken}

}

export const loginUser = async(res,email,password) =>{

    const existEmail = await checkEmail(email);
    
    console.log(existEmail)

    if(!existEmail){throw new ApiError(404,"User not found")};

    const matchPassword = await hashPassword.comparePassword(password,existEmail.password);

    if(!matchPassword){throw new ApiError(401,"Incorrect password")};

    const {accessToken,refreshToken} =  jwtToken.generateTokens({
        id:existEmail.id,
        role:existEmail.role
    });

    const user = await prisma.user.update({
        where:{id:existEmail.id},
        data:{
            currentRefreshToken:refreshToken
        },
    })

    await setRefreshTokenCookie(res,refreshToken);
    return {user,accessToken};
};

export const clearUserToken = async (res,refreshToken) =>{
     console.log(refreshToken)
    const user = jwtToken.verifyToken(refreshToken,process.env.REFRESH_SECRET_TOKEN);
    console.log(refreshToken)
    console.log(user)

    if(!user){throw new ApiError(401,"Incorrect token")};

    await prisma.user.update({
        where:{id:user.id},
        data:{
            currentRefreshToken:null,
        },
    }
    )

    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true,
        sameStrict:"Strict"
    });
};

export const changePassword = async (userId,oldPassword,newPassword) =>{
    const user = await prisma.user.findUnique({
        where:{id:userId}, 
    })

    const matchPassword = await hashPassword.comparePassword(oldPassword,user.password);

    if(!matchPassword){throw new ApiError(400,"Incorrect password")};

    const newHashPassword = await hashPassword.hashingPassword(newPassword);

    await prisma.user.update({
        where:{id:userId},
        data:{
            password:newHashPassword,
        }
    })
};


export const checkAndRefreshToken = async (userId,currentToken) =>{
    const user = await prisma.user.findUnique({
        where:{id:userId},
    });

    if(user.currentRefreshToken !== currentToken ){
        throw new ApiError(401,"Unauthorized. Token required");
    };

    const{accessToken,refreshToken} = jwtToken.generateTokens({id:user.id,role:user.role});

    await prisma.user.update({
        where:{id:userId},
        data:{
            currentRefreshToken:refreshToken,
        }
    })



    return {accessToken,refreshToken}

}
