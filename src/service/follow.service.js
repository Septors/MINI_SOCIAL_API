import prisma  from "../lib/prisma.client.js";
import ApiError from "../utils/ApiError.js";

export const createUserFollow = async(userId,followId) =>{
    return await prisma.follow.create({
        data:{
            followerId:userId,
            followingId:Number(followId)
        
        }
    });

};

export const userFollow = async(userId) =>{
    const follower = await prisma.follow.findFirst({
        where:{
            followerId:userId,
        },
    });

    const following = await prisma.follow.findFirst({
        where:{
            followingId:userId,
        },
    });

    return{follower,following};
};

export const unfollow = async(userId,followId) =>{
    return await prisma.follow.delete({
        where:{
            followerId_followingId:{
            followerId:userId,
            followingId:Number(followId),}
        }
    });
};