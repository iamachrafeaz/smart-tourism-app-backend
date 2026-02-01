import { checkVerificationCode, loginService, registerService, resendVerificationCode } from "../services/auth.service";

export const registerRequest = async (req: any, res: any, next: any) => {
    const { email, password } = req.body;

    try {
        await registerService(email, password);

        res.status(201).json({
            success: true,
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
    const { email, code } = req.body;

    try {
        const token = await checkVerificationCode(email, code);

        res.status(200).json({
            success: true,
            token
        });
    } catch (err) {
        next(err);
    }
}

export const resendVerificationCodeRequest = async (req: any, res: any, next: any) => {
    const { email } = req.body;

    try {
        await resendVerificationCode(email);

        res.status(200).json({
            success: true
        });
    } catch (err) {
        next(err);
    }
}