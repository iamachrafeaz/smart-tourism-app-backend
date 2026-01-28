import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import ApiError from '../utils/ApiError';
import { generateToken } from '../utils/jwt';
import { Transporter } from '../config/mailer.config';

export const registerService = async (email: string, password: string) => {

    const exists = await User.findOne({ email });
    if (exists) {
        throw new ApiError(409, "EMAIL_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashedPassword,
    });

    await sendVerificationEmail(user);

    const token = generateToken({
        id: user._id,
        role: user.role
    });

    return token;
}

export const loginService = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(401, "INVALID_CREDENTIALS");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(401, "INVALID_CREDENTIALS");

    const token = generateToken({
        id: user._id,
        role: user.role,
    });

    return token;
}


export const checkVerificationCode = async (
    email: string,
    code: number
) => {
    const user = await User.findOne({ email: email });

    if (!user) throw new ApiError(404, "USER_NOT_FOUND");

    if (user.isVerified) throw new ApiError(400, "USER_ALREADY_VERIFIED");

    const now = new Date();

    if (!user.verificationCodeExpires || user.verificationCodeExpires < now) {
        throw new ApiError(410, "CODE_EXPIRED")
    }

    if (!user.verificationCode || code.toString() !== user.verificationCode.toString()) {
        throw new ApiError(409, "CODE_INCORRECT");
    }

    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    user.isVerified = true;

    await user.save();

    const token = generateToken({
        id: user._id,
        role: user.role,
    });

    return token;
}

export const resendVerificationCode = async (email: string) => {
    const user = await User.findOne({ email: email });

    if (!user) throw new ApiError(404, "USER_NOT_FOUND");

    if (user.isVerified) throw new ApiError(400, "USER_ALREADY_VERIFIED");

    await sendVerificationEmail(user);
}

const sendVerificationEmail = async (user: any) => {
    const code = generateVerificationCode();

    user.verificationCode = code;
    user.verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    const mailOptions = {
        from: `<${process.env.APP_NAME}> <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Your Verification Code',
        html: `
      <p>Hello ${user.firstName || ''},</p>
      <p>Your verification code is: <b>${code}</b></p>
      <p>This code will expire in 15 minutes.</p>
    `,
    };

    await Transporter.sendMail(mailOptions);
}

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};