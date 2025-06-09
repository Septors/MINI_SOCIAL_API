import * as likeService from "../service/like.service.js";

export const toggleLike = async(req,res) =>{
    const userId = req.id;
    const postId = req.params.postId;

    const likeStatus = await likeService.checkLikeAndToggle(userId,postId);

    res.status(200).json({message: "Like change",likeStatus})
};

export const getUserLikes = async(req,res) =>{
    const userId =req.id;

    const userLikes = await likeService.getAllUserLike(userId);

    res.status(200).json(userLikes);
};

export const getPostLikes = async(req,res) =>{
    const postId = req.params.postId;

    const postLikes = await likeService.getAllLikePost(postId);

    res.status(200).json(postId);
};
