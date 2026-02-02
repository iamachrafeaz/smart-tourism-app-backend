import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import ApiError from '../utils/ApiError';
import { generateToken } from '../utils/jwt';
import { Transporter } from '../config/mailer.config';
import { ERRORS } from '../../constants/error.constants';
import pendingRequestsModel from '../models/pendingRequests.model';
import { createTouristService } from './tourist.service';
import { createGuide } from './guide.service';

export const registerService = async (email: string, password: string) => {
    const exists = await User.findOne({ email });
    if (exists) {
        throw new ApiError(ERRORS.EMAIL_ALREADY_EXISTS);
    }
    const existingPending = await pendingRequestsModel.findOne({ email })
    if (existingPending) await pendingRequestsModel.deleteOne({ email })

    const hashedPassword = await bcrypt.hash(password, 10);
    const otpCode = generateVerificationCode();

    await sendVerificationEmail(email, otpCode);

    const reg = await pendingRequestsModel.create({
        email,
        password: hashedPassword,
        step: "EMAIL_VERIFICATION",
        isEmailVerified: false,
        otpCode: otpCode,
        otpExpiresAt: Date.now() + 5 * 60 * 1000,
        data: {},
        expiresAt: new Date(Date.now() + 30 * 60 * 1000)
    });

    return {
        registrationToken: reg._id,
        registrationState: reg.step
    }
};

export const loginService = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(ERRORS.INVALID_CREDENTIALS);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(ERRORS.INVALID_CREDENTIALS);

    return generateToken({
        id: user._id,
        role: user.role,
    });
};

export const checkVerificationCode = async (registrationToken: string, otp: string) => {
    const reg = await pendingRequestsModel.findById(registrationToken);
    if (!reg) throw new ApiError(ERRORS.USER_NOT_FOUND);

    if (reg.step !== "EMAIL_VERIFICATION") throw new ApiError(ERRORS.INVALID_STEP);

    if (Date.now() > new Date(reg.otpExpiresAt!).getTime()) throw new ApiError(ERRORS.OTP_EXPIRED);

    if (reg.otpCode !== otp) throw new ApiError(ERRORS.OTP_INCORRECT);

    reg.isEmailVerified = true
    reg.step = "PROFILE_INFO"
    reg.otpCode = null

    await reg.save()

    return { registrationState: { currentStep: reg.step } }

};

export const resendVerificationCode = async (registrationToken: string) => {
    const reg = await pendingRequestsModel.findById(registrationToken);
    if (!reg) throw new ApiError(ERRORS.USER_NOT_FOUND);

    if (reg.step !== "EMAIL_VERIFICATION") throw new ApiError(ERRORS.INVALID_STEP);
    if (reg.isEmailVerified) throw new ApiError(ERRORS.EMAIL_ALREADY_VERIFIED);

    const otpCode = generateVerificationCode();

    await sendVerificationEmail(reg.email, otpCode);


    reg.step = "EMAIL_VERIFICATION";
    reg.isEmailVerified = false;
    reg.otpCode = otpCode;
    reg.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await reg.save();
};

export const completeProfile = async (
    registrationToken: string,
    data: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        dateOfBirth: Date;
        address: string;
        country: string;
    },
    filePath: string | null
) => {
    const reg = await pendingRequestsModel.findById(registrationToken);
    if (!reg) throw new ApiError(ERRORS.USER_NOT_FOUND)

    if (!reg.isEmailVerified) throw new ApiError(ERRORS.EMAIL_NOT_VERIFIED)

    reg.step = "COMPLETE";
    reg.data = { ...data, profilePictureUrl: filePath };
    await reg.save()

    return { registrationState: { currentStep: reg.step } }
};

export const chooseUserRole = async (
    registrationToken: string,
    role: string
) => {
    const reg = await pendingRequestsModel.findById(registrationToken);
    if (!reg) throw new ApiError(ERRORS.USER_NOT_FOUND)
    if (!reg.isEmailVerified || reg.step !== "COMPLETE" || reg.data == null) {
        throw new ApiError(ERRORS.INVALID_STEP)
    }

    if (role !== "TOURIST" && role !== "GUIDE") {
        throw new ApiError(ERRORS.INVALID_ROLE);
    }

    const user = await User.create({
        email: reg.email,
        password: reg.password,
        ...reg.data,
        isEmailVerified: true,
        role: role,
        isActive: true
    })

    if (role == "TOURIST") {
        await createTouristService(user.id);
    } else if (role == "GUIDE") {
        await createGuide(user.id)
    }

    await pendingRequestsModel.deleteOne({ _id: reg._id })

    return
}

const sendVerificationEmail = async (email: string, otp: string) => {
    const mailOptions = {
        from: `<${process.env.APP_NAME}> <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Verification Code',
        html: `
      <p>Hello there!</p>
      <p>Your verification code is: <b>${otp}</b></p>
      <p>This code will expire in 15 minutes.</p>
    `,
    };

    await Transporter.sendMail(mailOptions);
}

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};