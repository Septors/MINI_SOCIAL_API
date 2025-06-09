import prisma from "../lib/prisma.client.js"
import ApiError from "../utils/ApiError.js";

export const checkLikeAndToggle = async(userId,postId) =>{
    const checkLikeInPost = await prisma.like.findUnique({
        where:{
            userId_postId:{
                userId:userId,
                postId:Number(postId),
            }
        }
    });

    if(checkLikeInPost){
        await prisma.like.delete({
            where:{
                userId_postId:{
                    userId:userId,
                    postId:Number(postId)
                }
            }
        })
        return {like:false};
    }else{
        await prisma.like.create({
            data:{
                user:{connect: {id:userId}},
                post:{connect: {id:Number(postId)}},
            }
        })
        return {like:true};
    };
};

export const getAllUserLike =async(userId) =>{
    const user = await prisma.user.findUnique({
        where:{
            id:userId,
        },
        include:{
            likes:{
                include:{
                    post:true
                }
            }
        },
    });

    if(!user){throw new ApiError(404,"not founs user like")};

    return user.likes;
};

export const getAllLikePost = async(postId) =>{
    const postLikes = await prisma.like.count(
        {
            where:{
                postId:Number(postId),
            }
        }
    )
    if(!postLikes){throw new ApiError(404,"not found like or post hanv like")};

    return postLikes;
}