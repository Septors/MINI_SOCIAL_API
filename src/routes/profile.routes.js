import express from "express";
import catchAsync from "../utils/catchAsync.js";
import * as userMiddleware from "../middleware/user.middleware.js";
import * as profileController from "../controller/profile.controller.js";
import { validate } from '../middleware/validate.js';
import * as profileSchema from "../validation/profile.validation.js";


const profileRoutes = express.Router();

profileRoutes.post('/',
    validate(profileSchema.profileValidate),
    userMiddleware.decodedUserToken,
    catchAsync(profileController.createProfile),
);

profileRoutes.get('/:userId',
    userMiddleware.decodedUserToken,
    catchAsync(profileController.getUserProfile),
);

profileRoutes.get('/',
    userMiddleware.decodedUserToken,
    catchAsync(profileController.getMyProfile)
);

profileRoutes.patch('/',
    validate(profileSchema.changeProfileValidate),
    userMiddleware.decodedUserToken,
    catchAsync(profileController.changeProfile),
);

export default profileRoutes;