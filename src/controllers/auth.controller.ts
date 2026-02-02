import { checkVerificationCode, chooseUserRole, completeProfile, loginService, registerService, resendVerificationCode } from "../services/auth.service";

export const registerRequest = async (req: any, res: any, next: any) => {
    try {
        const { email, password } = req.body;

        const { registrationToken, registrationState } = await registerService(email, password);

        res.status(201).json({
            success: true,
            data: {
                registrationToken,
                registrationState
            }
        });
    } catch (err) {
        next(err);
    }
};

export const loginRequest = async (req: any, res: any, next: any) => {
    const { email, password } = req.body;
    try {
        const token = await loginService(email, password);

        res.status(201).json({
            success: true,
            token: token
        });
    } catch (err) {
        next(err);
    }
};

export const checkVerificationCodeRequest = async (req: any, res: any, next: any) => {
    try {
        const { registrationToken, otp } = req.body;

        const { registrationState } = await checkVerificationCode(registrationToken, otp);

        res.status(200).json({
            success: true,
            data: registrationState
        });
    } catch (err) {
        next(err);
    }
};

export const completeProfileRequest = async (req: any, res: any, next: any) => {
    const registrationToken = req.body.registrationToken;
    const data = JSON.parse(req.body.data);
    const filePath = req.file?.path || null;

    try {
        const { registrationState } = await completeProfile(registrationToken, data, filePath);

        res.status(200).json({
            success: true,
            data: registrationState
        });
    } catch (err) {
        next(err)
    }
};

export const chooseUserRoleRequest = async (req: any, res: any, next: any) => {
    const registrationToken = req.body.registrationToken;
    const { role } = req.body;

    try {
        await chooseUserRole(registrationToken, role);
        res.status(200).json({
            success: true,
            message: "USER_CREATED",
        });
    } catch (err) {
        next(err);
    }
}

export const resendVerificationCodeRequest = async (req: any, res: any, next: any) => {
    const { registrationToken } = req.body;

    try {
        await resendVerificationCode(registrationToken);

        res.status(200).json({
            success: true
        });
    } catch (err) {
        next(err);
    }
};