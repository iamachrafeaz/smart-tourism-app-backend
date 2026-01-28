import { Router } from "express";
import {
    completeAccountRequest,
    chooseUserRoleRequest,
    updateProfilePhotoRequest
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
    completeAccountSchema,
    chooseUserRoleSchema
} from "../validators/user.validator";
import { upload } from "../middlewares/uploadProfilePhoto";

const router = Router();

/**
 * @route   POST /api/user/complete-account
 * @desc    Complete user profile (personal info)
 * @access  Protected
 */
router.post(
    "/complete-account",
    authenticate,
    validate(completeAccountSchema),
    completeAccountRequest
);

/**
 * @route   POST /api/user/choose-role
 * @desc    Choose user role (once)
 * @access  Protected
 */
router.post(
    "/choose-role",
    authenticate,
    validate(chooseUserRoleSchema),
    chooseUserRoleRequest
);

router.post(
    "/me/photo",
    authenticate,
    upload.single("profilePhoto"),
    updateProfilePhotoRequest
);

export default router;
