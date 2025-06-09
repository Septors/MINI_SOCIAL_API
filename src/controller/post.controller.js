import * as postService from "../service/post.service.js";
import ApiError from "../utils/ApiError.js";

export const createUserPost = async(req,res) =>{
    const userId = req.id;
    const data = req.body;

    const post = await postService.createPost(userId,data);
        console.log(post)
    if(!post){throw new ApiError(404,"User not found")};

    res.status(201).json({message: "Post created"})
};

export const changeUserPOst = async(req,res) =>{
    const postId = req.params.postId;
    const userId = req.id;
    const data = req.body;

    const newPost = await postService.updatePost(userId,postId,data);

    res.status(200).json({message: "Post has been update",newPost});
};

export const getUserPosts = async(req,res) =>{
    const userId = req.id;
    
    const userPosts = await postService.findAllUserPosts(userId);

    res.status(200).json(userPosts);
}

export const getUserPostById = async(req,res) =>{
    const userId = req.id;
    const postId = req.params.postId;

    const postById = await postService.findPostById(userId,postId);

    res.status(200).json({postById});

};

export const deleteUserPost = async(req,res) =>{
    const userId = req.id;
    const postId = req.params.postId;

    await postService.deletePost(userId,postId);

    res.status(200).json({message: "Post successfully deleted"})
}