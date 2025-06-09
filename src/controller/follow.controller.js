import * as followService from "../service/follow.service.js"

export const followUser = async(req,res) =>{
    const userId = req.id;
    const followId = req.params.userId;

    const createFollow = await followService.createUserFollow(userId,followId)

    res.status(201).json({message: "following",createFollow});
};

export const getUserFollow = async(req,res) =>{
    const userId =req.id;

    const {followers,following} = await followService.userFollow(userId);

    res.status(200).json({followers,following});
};

export const unfollow = async(req,res) =>{
    const userId = req.id;
    const followId = req.params.userId;

    const clearFollow = await followService.unfollow(userId,followId);

    res.status(200).json({message: "Unfollowing"});
};
