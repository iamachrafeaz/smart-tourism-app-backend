export const ERRORS = {
    // 🧍 User
    USER_NOT_FOUND: {
        code: "USER_NOT_FOUND",
        message: "User not found",
        status: 404,
    },
    INVALID_ROLE: {
        code: "INVALID_ROLE",
        message: "Invalide Role",
        status: 404
    },
    USER_ALREADY_VERIFIED: {
        code: "USER_ALREADY_VERIFIED",
        message: "User already verified",
        status: 400,
    },
    EMAIL_ALREADY_EXISTS: {
        code: "EMAIL_ALREADY_EXISTS",
        message: "Email already exists",
        status: 409,
    },
    EMAIL_NOT_VERIFIED: {
        code: "EMAIL_NOT_VERIFIED",
        message: "Email is not verified",
        status: 409,
    },
    INVALID_STEP: {
        code: "INVALID_STEP",
        message: "Invalid step",
        status: 404,
    },

    // Guide
    GUIDE_NOT_FOUND: {
        code: "GUIDE_NOT_FOUND",
        message: "Guide profile not found",
        status: 404,
    },
    CITY_NOT_FOUND: {
        code: "CITY_NOT_FOUND",
        message: "City not found",
        status: 404,
    },
    TITLE_REQUIRED: {
        code: "TITLE_REQUIRED",
        message: "Title is required",
        status: 400,
    },
    PRICE_INVALID: {
        code: "PRICE_INVALID",
        message: "Price must be greater than 0",
        status: 400,
    },
    DURATION_INVALID: {
        code: "DURATION_INVALID",
        message: "Duration must be positive",
        status: 400,
    },
    STOPS_REQUIRED: {
        code: "STOPS_REQUIRED",
        message: "At least one stop is required",
        status: 400,
    },
    INVALID_LOCATION_TYPE: {
        code: "INVALID_LOCATION_TYPE",
        message: "Invalid location type, must be 'Point'",
        status: 400,
    },
    INVALID_COORDINATES: {
        code: "INVALID_COORDINATES",
        message: "Coordinates are out of valid range",
        status: 400,
    },
    DOCUMENTS_REQUIRED: {
        code: "DOCUMENTS_REQUIRED",
        message: "Documents are required",
        status: 400
    },


    // 🔑 Auth / Login
    INVALID_CREDENTIALS: {
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
        status: 401,
    },
    ACCOUNT_NOT_VERIFIED: {
        code: "ACCOUNT_NOT_VERIFIED",
        message: "Please verify your email first",
        status: 403,
    },
    TOKEN_INVALID: {
        code: "TOKEN_INVALID",
        message: "Invalid authentication token",
        status: 401,
    },
    TOKEN_EXPIRED: {
        code: "TOKEN_EXPIRED",
        message: "Session expired, please login again",
        status: 401,
    },

    // 📩 Verification
    OTP_EXPIRED: {
        code: "OTP_EXPIRED",
        message: "Verification code expired",
        status: 410,
    },
    OTP_INCORRECT: {
        code: "OTP_INCORRECT",
        message: "Verification code is incorrect",
        status: 400,
    },
    VERIFICATION_REQUIRED: {
        code: "VERIFICATION_REQUIRED",
        message: "Email verification required",
        status: 403,
    },

    // 📥 Validation
    VALIDATION_ERROR: {
        code: "VALIDATION_ERROR",
        message: "Some fields are invalid",
        status: 400,
    },
    EMAIL_INVALID: {
        code: "EMAIL_INVALID",
        message: "Email format is invalid",
        status: 400,
    },
    EMAIL_ALREADY_VERIFIED: {
        code: "EMAIL_ALREADY_VERIFIED",
        message: "Email is already verified",
        status: 400,
    },
    PASSWORD_TOO_WEAK: {
        code: "PASSWORD_TOO_WEAK",
        message: "Password must be at least 8 characters",
        status: 400,
    },
    FIELD_REQUIRED: {
        code: "FIELD_REQUIRED",
        message: "Required field is missing",
        status: 400,
    },

    // ⚙️ System
    INTERNAL_SERVER_ERROR: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
        status: 500,
    },
    EMAIL_SEND_FAILED: {
        code: "EMAIL_SEND_FAILED",
        message: "Failed to send verification email",
        status: 500,
    },
    DATABASE_ERROR: {
        code: "DATABASE_ERROR",
        message: "Database operation failed",
        status: 500,
    },

    // Posts
    POST_NOT_FOUND: {
        code: "POST_NOT_FOUND",
        message: "Post not found",
        status: 404,
    },
    ALREADY_LIKED: {
        code: "ALREADY_LIKED",
        message: "You have already liked this post",
        status: 400,
    },
    NOT_AUTHORIZED: {
        code: "NOT_AUTHORIZED",
        message: "You are not authorized to perform this action",
        status: 403,
    },

} as const;

export type ErrorKey = keyof typeof ERRORS;
export type ErrorCode = (typeof ERRORS)[ErrorKey]["code"];
