import mongoose, { Types } from "mongoose";
import Review from "../models/review.model";
import Tour from "../models/tour.model";
import { getTopReviewsByGuide } from "./review.service";
import ApiError from "../utils/ApiError";
import { ERRORS } from "../../constants/error.constants";
import cityModel from "../models/city.model";
import guideModel from "../models/guide.model";

export const createGuide = async (userId: string) => {
    return await guideModel.create({
        user: userId,
        verificationStatus: "UNVERIFIED",
    });
}

export const completeGuideProfile = async (
    userId: string,
    languages: string[],
    description: string,
    expertise: string[],
    fee: number,
    city: string,
    selfiePath: string | null,
    idPath: string | null,
    certifications: string[] | null,

) => {

    const user = await guideModel.findOne({ user: userId });
    if (!user) throw new ApiError(ERRORS.USER_NOT_FOUND);
    if (user.verificationStatus !== "UNVERIFIED") throw new ApiError(ERRORS.INVALID_STEP);

    if (selfiePath == null || idPath == null || certifications == null) {
        throw new ApiError(ERRORS.DOCUMENTS_REQUIRED)
    }

    const cityObj = await cityModel.findOne({ name: city });

    user.set({
        certifications: certifications.map(c => ({ url: c, verificationStatus: "PENDING" })),
        city: cityObj,
        verificationStatus: "PENDING",
        idPath: { url: idPath, verificationStatus: "PENDING" },
        selfiePath: { url: selfiePath, verificationStatus: "PENDING" },
        languages,
        fee,
        expertise,
        description,
    });

    await user.save();

    return
}

export const getGuideMe = async (userId: string) => {
    console.log(userId)
    const guide = await guideModel.findOne({ user: userId }).lean();
    return guide;
}

export const getGuideById = async (guideId: string) => {
    const guide = await guideModel.findById(guideId)
        .populate([
            { path: "user", select: "firstName lastName profilePictureUrl -_id" },
            { path: "city", select: "name -_id" }
        ]).lean();;

    const tours = await Tour.find({ guide: guideId }).select("price duration title").limit(3).lean();

    const reviews = await getTopReviewsByGuide(guideId)

    return { ...guide, tours, reviews };
}

export const getAllGuides = async () => {
    const guides = await guideModel.aggregate([
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

    await guideModel.findByIdAndUpdate(guideId, {
        rating: Number(avgRating.toFixed(1)), // 4.666 → 4.7
        reviewsCount
    });
};
