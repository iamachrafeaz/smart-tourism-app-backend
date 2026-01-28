import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

export const authenticate = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError(401, "UNAUTHORIZED"));
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
    } catch (err) {
        console.log(err)
        next(new ApiError(401, "Invalid token"));
    }
};
