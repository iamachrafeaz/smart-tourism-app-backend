import { Router } from "express";
import {
    registerRequest,
    loginRequest,
    checkVerificationCodeRequest,
    resendVerificationCodeRequest
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register user & send verification code
 * @access  Public
 */
router.post(
    "/register",
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
 * @access  Protected (JWT)
 */
router.post(
    "/verify",
    authenticate,
    checkVerificationCodeRequest
);

/**
 * @route   POST /api/auth/resend-code
 * @desc    Resend verification code
 * @access  Protected (JWT)
 */
router.post(
    "/resend-code",
    authenticate,
    resendVerificationCodeRequest
);

router.get(
    "/test-token",
    authenticate,
    async (req: any, res: any) => {
        res.status(201).json({ message: req.user.role });
    })

export default router;


