import { z } from "zod";
import { ExperienceAccessTypeEnum } from "../enums/experienceAccessType.enum";
import { ExperienceCategoryEnum } from "../enums/experienceCategory.enum";
import { ExperienceFrequencyEnum } from "../enums/experienceFrequency.enum";
import mongoose from "mongoose";

const geoPointSchema = z.object({
    type: z.literal("Point"),
    coordinates: z
        .tuple([
            z.number().min(-180).max(180), // longitude
            z.number().min(-90).max(90)    // latitude
        ])
});

const objectIdSchema = z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid MongoDB ObjectId"
    });


export const createExperienceSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters long"),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters long"),

    location: geoPointSchema,

    address: z.string().optional(),

    rating: z
        .number()
        .min(0)
        .max(5)
        .optional(),

    imageUrl: z
        .array(z.string().url("Invalid image URL"))
        .optional(),

    frequency: z
        .enum(ExperienceFrequencyEnum)
        .optional(),

    category: z
        .enum(ExperienceCategoryEnum)
        .optional(),

    accessType: z
        .enum(ExperienceAccessTypeEnum)
        .optional(),

    tips: z
        .array(z.string().min(3))
        .optional(),

    city: objectIdSchema.optional()
});
