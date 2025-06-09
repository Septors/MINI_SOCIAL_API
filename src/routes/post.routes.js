import express from "express";
import * as userMiddleware from "../middleware/user.middleware.js";
import * as postController from "../controller/post.controller.js";
import catchAsync from "../utils/catchAsync.js";

import { validate } from "../middleware/validate.js"; 
import * as schema from "../validation/post.validation.js"



const postRoutes = express.Router();

postRoutes.post('/',
    validate(schema.postSchema),
    userMiddleware.decodedUserToken,
    catchAsync(postController.createUserPost)

)

postRoutes.get('/:postId',
    userMiddleware.decodedUserToken,
    catchAsync(postController.getUserPostById)
);

postRoutes.get('/',
    userMiddleware.decodedUserToken,
    catchAsync(postController.getUserPosts),
);

postRoutes.patch('/:postId',
    validate(schema.changePostSchema),
    userMiddleware.decodedUserToken,
    catchAsync(postController.changeUserPOst)
);

postRoutes.delete('/:postId',
    userMiddleware.decodedUserToken,
    catchAsync(postController.deleteUserPost)
)

export default postRoutes;