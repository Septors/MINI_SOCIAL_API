import prisma from "../lib/prisma.client.js";
import ApiError from "../utils/ApiError.js";

export const create = async(userId,data) =>{
    const existProfile = await prisma.profile.findUnique({
        where:{userId:userId},
    }
    )

    if(existProfile){
        throw new ApiError(409,"The user already has a profile");
    };


    const profile =  await prisma.profile.create({
        data:{
            ...data,
            userId:userId,
        }
    });
     return profile;

};

export const getUserProfile = async(userId) =>{
    const user = await prisma.user.findUnique({
        where:{id:Number(userId)},
        include:{
            profile:true
        },
    });
    if(!user){throw new ApiError(404,"Profile not found")};

    return user;
};

export const updateProfile = async(userId,data) =>{
    const profile = await prisma.user.update({
        where:{id:userId},
        data:{
            profile:{
                update:{
                    ...data
                }
            }
        },
        include:{
            profile:true
        }
    });

    if(!profile){throw new ApiError(404,"Profile not found")};

    return profile;
}