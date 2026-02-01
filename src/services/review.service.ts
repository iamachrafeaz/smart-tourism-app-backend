import { ERRORS } from "../../constants/error.constants";
import Guide from "../models/guide.model";
import Review from "../models/review.model";
import Tourist from "../models/tourist.model";
import ApiError from "../utils/ApiError";
import { updateGuideRating } from "./guide.service";

export const createReview = async ({
    guideId,
    userId,
    description,
    rating,
}: {
    guideId: string;
    userId: string;
    description: string;
    rating: number;
}) => {
    const tourist = await Tourist.findOne({ user: userId });
    if (!tourist) throw new ApiError(ERRORS.USER_NOT_FOUND);

    const guide = await Guide.findById(guideId);
    if (!guide) throw new ApiError(ERRORS.POST_NOT_FOUND); // or create a GUIDE_NOT_FOUND error

    if (rating > 5 || rating < 0)
        throw new ApiError({
            code: "INVALID_RATING",
            message: "Rating must be between 0 and 5",
            status: 400,
        });

    const review = await Review.create({
        description,
        rating,
        tourist: tourist._id,
        guide: guide._id,
    });

    await updateGuideRating(guideId);

    return review;
};

export const getTopReviewsByGuide = async (guideId: string) => {
    const reviews = await Review.find({ guide: guideId })
        .populate({
            path: "tourist",
            populate: {
                path: "user",
                select: "firstName lastName",
            },
        })
        .limit(3)
        .lean();

    return reviews;
};

export const getReviewsCountByGuide = async (guideId: string) => {
    const counts = await Review.aggregate([
        { $match: { guide: guideId } }, // add filter for the specific guide
        { $group: { _id: "$guide", count: { $sum: 1 } } },
    ]);

    return counts.length > 0 ? counts[0].count : 0;
};
