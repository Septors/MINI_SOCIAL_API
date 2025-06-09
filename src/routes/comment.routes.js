import express from "express";
import catchAscync from "../utils/catchAsync.js";
import * as authMiddleware from "../middleware/user.middleware.js";
import * as commentController from "../controller/comment.controller.js";

const commentRoutes = express.Router();

commentRoutes.post('/:postId',
    authMiddleware.decodedUserToken,
    catchAscync(commentController.createPostComment)
);

commentRoutes.get('/:postId',
    authMiddleware.decodedUserToken,
    catchAscync(commentController.getCommentsByPostId)
);

commentRoutes.patch('/:commentId',
    catchAscync(commentController.changeComment),
);

commentRoutes.delete('/:commentId',
    catchAscync(commentController.deleteComment)
);

export default commentRoutes;