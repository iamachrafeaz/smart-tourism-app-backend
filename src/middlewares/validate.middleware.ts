import { ZodError, ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";
import { ERRORS } from "../../constants/error.constants";

export const validate =
  (schema: ZodType) =>
    (req: Request, _: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (err: unknown) {
        if (err instanceof ZodError) {
          const firstIssue = err.issues[0];

          return next(
            new ApiError({
              ...ERRORS.VALIDATION_ERROR,
              message: firstIssue.message, // override default message
            })
          );
        }

        return next(new ApiError(ERRORS.INTERNAL_SERVER_ERROR));
      }
    };
