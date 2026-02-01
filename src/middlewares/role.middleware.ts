import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";
import { ERRORS } from "../../constants/error.constants";

export const authorize =
    (...allowedRoles: string[]) =>
        (req: Request & { user?: { role?: string } }, res: Response, next: NextFunction) => {
            if (!req.user?.role || !allowedRoles.includes(req.user.role)) {
                return next(new ApiError(ERRORS.VERIFICATION_REQUIRED));
            }
            next();
        };
