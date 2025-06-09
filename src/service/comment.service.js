import prisma from "../lib/prisma.client.js";
import ApiError from "../utils/ApiError.js";

export const createComment = async(userId,postId,parentId,text) =>{
    const newComment = await prisma.comment.create({
        data:{
            text,
            post:{connect:{id:Number(postId)}},
            user:{connect:{id:userId}},
            ...(parentId && {parent:{connect:{id:Number(parentId)}}})
        }
    })

    if(!newComment){throw new ApiError(400,"Comment not created")};

    return newComment;
};

export const getCommentsByIdPost = async(userId,postId) =>{
    const comment = await prisma.comment.findMany({
        where:{
            userId:userId,
            postId:Number(postId)
        }
    })

    if(!comment){throw new ApiError(404,"Comment not found")};

    return comment;
};

export const changeComment = async(commentId,text) =>{
    const updateComment = await prisma.comment.update({
        where:{
            id:Number(commentId)
        },
        data:{
            text,
        }
    })

    if(!updateComment){throw new ApiError(404,"Comment not changed")};

    return updateComment;
};

export const deleteCommentById = async(commentId) =>{
    await prisma.comment.delete({
        where:{
            id:Number(commentId),
        }
    })
}