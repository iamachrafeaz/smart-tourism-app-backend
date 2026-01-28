import mongoose from "mongoose";
import { UserRoleEnum } from "../enums/userRole.enum";

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: String,
        lastName: String,
        phoneNumber: String,
        dateOfBirth: Date,
        address: String,
        country: String,
        profilePictureUrl: String,
        verificationCode: Number,
        verificationCodeExpires: Date,
        role: { type: String, enum: UserRoleEnum, required: false },
        isComplete: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
