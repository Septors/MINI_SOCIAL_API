import express from "express";
import * as userController from "../controller/user.controller.js";
import * as userMiddlewares from "../middleware/user.middleware.js";
import catchAsync from "../utils/catchAsync.js";
import { validate } from "../middleware/validate.js";
import * as schema from "../validation/user.validation.js";


const userRoutes = express.Router();

userRoutes.post('/register',
    validate(schema.registerValidation),
    catchAsync(userController.registerUser)
);

userRoutes.post('/login',
    validate(schema.loginValidation),
    catchAsync(userController.loginUser)
);

//userRoutes.post('/confirm-email',);

userRoutes.delete('/logout',
    catchAsync(userController.logout),
);

userRoutes.patch('/change-password',
    validate(schema.changePassword),
    userMiddlewares.decodedUserToken,
    catchAsync(userController.changeUserPassword),
);

userRoutes.post('/refresh-token',
    userMiddlewares.decodedUserToken,
    catchAsync(userController.getRefreshToken),
);

export default userRoutes;

