import * as commentService from "../service/comment.service.js";

export const createPostComment = async(req,res) =>{
    const userId = req.id;
    const postId = req.params.postId;
    const {text,parentId} = req.body;

    const newComment = await commentService.createComment(userId,postId,parentId,text);

    res.status(201).json(newComment);
};

export const getCommentsByPostId = async(req,res) =>{
    const userId = req.id;
    const postId = req.params.postId;

    const comment = await commentService.getCommentsByIdPost(userId,postId);

    res.status(200).json(comment);
};

export const changeComment = async(req,res) =>{
    const commentId = req.params.commentId;
    const text = req.body;

    const newComment = await commentService.changeComment(commentId,text);

    res.status(200).json(newComment);
};

export const deleteComment = async(req,res) =>{
    const commentId = req.params.commentId;

    await commentService.deleteCommentById(commentId);

    res.status(200).json({message: "Comment has been delete"});
}

