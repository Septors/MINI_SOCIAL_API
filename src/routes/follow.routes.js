import express from "express";
import * as userMiddleware from "../middleware/user.middleware.js"
import * as followController from "../controller/follow.controller.js";
import catchAsync from "../utils/catchAsync.js";

const followRoutes = express.Router();

followRoutes.post('/:userId',   
    userMiddleware.decodedUserToken,
    catchAsync(followController.followUser)

);

followRoutes.get('/',
    userMiddleware.decodedUserToken,
    catchAsync(followController.getUserFollow),
)


followRoutes.delete('/:userId',
    userMiddleware.decodedUserToken,
    catchAsync(followController.unfollow)
);

export default followRoutes;