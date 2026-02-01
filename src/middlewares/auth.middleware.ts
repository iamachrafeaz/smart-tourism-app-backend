import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import { ERRORS } from "../../constants/error.constants";

export const authenticate = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError(ERRORS.TOKEN_INVALID));
    }

    try {
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as any;

        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        next();
    } catch (err: any) {
        console.log("JWT ERROR:", err.message);

        // Differentiate expired vs invalid
        if (err.name === "TokenExpiredError") {
            return next(new ApiError(ERRORS.TOKEN_EXPIRED));
        }

        return next(new ApiError(ERRORS.TOKEN_INVALID));
    }
};
