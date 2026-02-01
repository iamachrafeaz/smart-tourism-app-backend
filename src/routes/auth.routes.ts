import { Router } from "express";
import {
    registerRequest,
    loginRequest,
    checkVerificationCodeRequest,
    resendVerificationCodeRequest,
    completeProfileRequest,
    chooseUserRoleRequest
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { uploadProfilePhoto } from "../middlewares/uploadProfilePhoto";

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register user & send verification code
 * @access  Public
 */
router.post(
    "/register/start",
    validate(registerSchema),
    registerRequest
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
    "/login",
    validate(loginSchema),
    loginRequest
);

/**
 * @route   POST /api/auth/verify
 * @desc    Verify email with code
 */
router.post(
    "/register/verify-email",
    checkVerificationCodeRequest
);

/**
 * @route   POST /api/auth/resend-code
 * @desc    Resend verification code
 */
router.post(
    "/register/resend-otp",
    resendVerificationCodeRequest
);

router.post(
    "/register/profile",
    uploadProfilePhoto.single("profilePhoto"),
    completeProfileRequest
);

router.post(
    "/register/choose-role",
    chooseUserRoleRequest
);

router.post(
    "/test-upload",
    uploadProfilePhoto.single("profilePhoto"),
    async (req: any, res: any) => {
        const profilePhoto = req.file;
        const data = JSON.parse(req.body.data);
        console.log(profilePhoto.path);
        console.log(data);
        res.json({ data })
    }
);


router.get(
    "/test-token",
    authenticate,
    async (req: any, res: any) => {
        res.status(201).json({ message: req.user.role });
    })

export default router;


