import { Router } from "express";
import {
    updateProfilePhotoRequest,
    getMeRequest
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
    completeAccountSchema,
    chooseUserRoleSchema
} from "../validators/user.validator";
import { uploadProfilePhoto } from "../middlewares/uploadProfilePhoto";

const router = Router();

router.get(
    "/me",
    authenticate,
    getMeRequest
);


router.post(
    "/me/photo",
    authenticate,
    uploadProfilePhoto.single("profilePhoto"),
    updateProfilePhotoRequest
);

export default router;
