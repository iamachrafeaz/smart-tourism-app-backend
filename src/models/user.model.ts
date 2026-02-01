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
        role: { type: String, enum: UserRoleEnum, required: false },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
