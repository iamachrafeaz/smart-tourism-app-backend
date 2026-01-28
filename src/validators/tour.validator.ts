import { z } from "zod";

export const createTourSchema = z.object({
    title: z.string().min(3),
    price: z.number(),
    duration: z.number(),
    cityId: z.string(),
    stops: z.array(
        z.object({
            order: z.number(),
            location: z.object({
                type: z.literal("Point"),
                coordinates: z.tuple([z.number(), z.number()])
            })
        })
    ).min(1)
});