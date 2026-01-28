import { z } from "zod";
import { UserRoleEnum } from "../enums/userRole.enum";

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

export const completeAccountSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    phoneNumber: z.string().regex(/^\+?[0-9]{8,15}$/),
    dateOfBirth: z.coerce.date().refine((date) => date <= eighteenYearsAgo, {
        message: "You must be at least 18 years old.",
    }),
    address: z.string().min(5),
    country: z.string().min(2)
});

export const chooseUserRoleSchema = z.object({
    role: z.enum(UserRoleEnum)
});