import { RejectionHandler } from "winston";
import prisma from "../lib/prisma.client.js"
import ApiError from "../utils/ApiError.js";

export const createPost = async(userId,data)  =>{
    const post = await prisma.post.create({
        data:{
            ...data,
            userId:Number(userId),
        }
    })

    return post;    

};

export const updatePost = async(userId,postId,data) => {
    const updatedPost = await prisma.post.update({
        where:{
            userId:userId,
            id:Number(postId)
        },
        data:{
            ...data
        }
    });

    if(!updatedPost){throw new ApiError(404,"Post not found")};

    return updatedPost;

};

export const findAllUserPosts = async (userId) => {
    const userPosts = await prisma.user.findUnique({
        where:{id:Number(userId)},
        include:{
            posts:true
        }
    });

    if(!userPosts){throw new ApiError(404,"User posts not found")};

    return userPosts.posts;
};

export const findPostById = async (userId,postId) =>{
    const post = await prisma.post.findUnique({
        where:{
            userId:Number(userId),
            id:Number(postId)
        }
    })

    if(!post){throw new ApiError(404,"Post not found")};

    return post;
};

export const deletePost =  async (userId,postId) =>{

    const post = await prisma.post.findFirst({
        where:{
            id:Number(postId),
            userId: userId,
        }
    })

    if(!post){
        throw new ApiError(404,'Post not found');
    }
     const deletedPost = await prisma.post.delete({
        where:{
            id: Number(postId),
            userId:userId
        }
    });
    if(!deletedPost){throw new ApiError(404,"Error deleting post")};


};
