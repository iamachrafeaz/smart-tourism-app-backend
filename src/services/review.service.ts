import Guide from "../models/guide.model"
import Review from "../models/review.model";
import Tourist from "../models/tourist.model";
import ApiError from "../utils/ApiError";
import { updateGuideRating } from "./guide.service";

/*
*   Tourist can leave a review for a guide
*/
export const createReview = async (
    { guideId, userId, description, rating }: {
        guideId: string, userId: string, description: string, rating: number
    }
) => {
    const tourist = await Tourist.findOne({ user: userId });
    if (!tourist) throw new ApiError(404, "Not Found");

    const guide = await Guide.findById(guideId);
    if (!guide) throw new ApiError(404, "Not Found");

    if (rating > 5 || rating < 0) throw new ApiError(404, "No!")

    const review = await Review.create({
        description,
        rating: rating,
        tourist: tourist._id,
        guide: guide._id
    });

    await updateGuideRating(guideId);

    return review;
}

export const getTopReviewsByGuide = async (guideId: string) => {
    const reviews = await Review.find({ guide: guideId }).populate({
        path: "tourist", populate: {
            path: "user",
            select: "firstName lastName"
        }
    }).limit(3).lean();

    return reviews;
}


export const getReviewsCountByGuide = async (guideId: string) => {
    const counts = await Review.aggregate([
        { $group: { _id: "$guide", count: { $sum: 1 } } }
    ]);
    return counts;
}

