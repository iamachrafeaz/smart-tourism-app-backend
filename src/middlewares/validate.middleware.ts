import { ZodError, ZodType } from "zod"; // Use ZodType
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

export const validate =
  (schema: ZodType) =>
    (req: Request, _: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (err: unknown) {
        if (err instanceof ZodError) {
          next(new ApiError(422, err.issues[0].message));
        } else {
          next(new ApiError(500, "Validation failed"));
        }
      }
    };