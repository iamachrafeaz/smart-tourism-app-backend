import { z } from 'zod';

export const createReviewSchema = z.object({
    guideId: z.string(),
    description: z.string().min(3),
    rating: z.number()
})