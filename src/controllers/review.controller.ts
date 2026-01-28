import { createReview } from "../services/review.service"

export const createReviewRequest = async (req: any, res: any, next: any) => {

    try {
        const userId = req.user.id;
        const { guideId, description, rating } = req.body;

        const review = await createReview({ guideId, userId, description, rating });

        res.json({
            success: true,
            data: review
        })
    } catch (err) {
        next(err)
    }
}