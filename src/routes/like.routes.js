import express from "express";
import * as likeController from "../controller/like.controller.js";
import * as userMiddleware from '../middleware/user.middleware.js';
import catchAsync from "../utils/catchAsync.js";

const likeRoutes = express.Router();

likeRoutes.post('/:postId',
    userMiddleware.decodedUserToken,
    catchAsync(likeController.toggleLike),
);

likeRoutes.get('/:postId',
    userMiddleware.decodedUserToken,
    catchAsync(likeController.getPostLikes)
);

likeRoutes.get('/',
    userMiddleware.decodedUserToken,
    catchAsync(likeController.getUserLikes),
);

export default likeRoutes;