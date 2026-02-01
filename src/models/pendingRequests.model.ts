import mongoose from "mongoose";

const pendingRequestSchema = new mongoose.Schema({
    email: { type: String, required: true, index: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    otpCode: { type: String },
    otpExpiresAt: { type: Date },
    data: {},
    step: {
        type: String,
        enum: ["EMAIL_VERIFICATION", "PROFILE_INFO", "PROFILE_PICTURE", "COMPLETE"],
        default: "EMAIL_VERIFICATION"
    }, expiresAt: { type: Date, index: { expires: 0 } }
}, {
    timestamps: true
});

export default mongoose.model("PendingRequest", pendingRequestSchema)