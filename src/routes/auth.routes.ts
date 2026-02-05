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

router.post(
    "/register/start",
    validate(registerSchema),
    registerRequest
);

router.post(
    "/login",
    validate(loginSchema),
    loginRequest
);


router.post(
    "/register/verify-email",
    checkVerificationCodeRequest
);

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

export default router;


