import { Types } from "mongoose";
import Guide from "../models/guide.model";
import Review from "../models/review.model";
import Tour from "../models/tour.model";
import { getTopReviewsByGuide } from "./review.service";

export const createGuide = async (userId: string) => {
    return await Guide.create({
        user: userId,
        isVerified: false,
    })
}

export const completeGuideProfile = async (
    userId: string,
    languages: string[],
    description: string,
    expertise: string[],
    fee: number,
    city: string
) => {
    return await Guide.findOneAndUpdate({ user: userId }, {
        fee,
        city,
        languages,
        description,
        expertise
    });
}


export const getGuideById = async (guideId: string) => {
    const guide = await Guide.findById(guideId)
        .populate([
            { path: "user", select: "firstName lastName profilePictureUrl -_id" },
            { path: "city", select: "name -_id" }
        ]).lean();;

    const tours = await Tour.find({ guide: guideId }).select("price duration title").limit(3).lean();

    const reviews = await getTopReviewsByGuide(guideId)

    return { ...guide, tours, reviews };
}

export const getAllGuides = async () => {
    const guides = await Guide.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $match: { "user.isActive": true }
        },
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "guide",
                as: "reviews"
            }
        },

        {
            $addFields: {
                reviewsCount: { $size: "$reviews" }
            }
        },

        {
            $project: {
                "user.firstName": 1,
                "user.lastName": 1,
                "user.profilePictureUrl": 1,
                fee: 1,
                rating: 1,
                languages: 1,
                expertise: 1,
                reviewsCount: 1,
                isAvailable: 1,
            }
        }
    ]);

    return guides;
};


export const updateGuideRating = async (guideId: string) => {
    const stats = await Review.aggregate([
        { $match: { guide: new Types.ObjectId(guideId) } },
        {
            $group: {
                _id: "$guide",
                avgRating: { $avg: "$rating" },
                reviewsCount: { $sum: 1 }
            }
        }
    ]);

    const avgRating = stats[0]?.avgRating || 0;
    const reviewsCount = stats[0]?.reviewsCount || 0;

    await Guide.findByIdAndUpdate(guideId, {
        rating: Number(avgRating.toFixed(1)), // 4.666 → 4.7
        reviewsCount
    });
};
