import Tour from "../models/tour.model";
import Guide from "../models/guide.model";
import City from "../models/city.model";
import ApiError from "../utils/ApiError";
import { getGuideById } from "./guide.service";
import { ERRORS } from "../../constants/error.constants";

export const createTour = async ({
    userId,
    title,
    price,
    duration,
    cityId,
    stops,
}: {
    userId: string;
    title: string;
    price: number;
    duration: number;
    cityId: string;
    stops: { order: number; location: { type: "Point"; coordinates: number[] } }[];
}) => {
    const guide = await getGuideById(userId);
    if (!guide) throw new ApiError(ERRORS.GUIDE_NOT_FOUND);

    const city = await City.findById(cityId);
    if (!city) throw new ApiError(ERRORS.CITY_NOT_FOUND);

    if (!title?.trim())
        throw new ApiError({
            code: "TITLE_REQUIRED",
            message: "Title is required",
            status: 400,
        });

    if (price <= 0)
        throw new ApiError({
            code: "PRICE_INVALID",
            message: "Price must be greater than 0",
            status: 400,
        });

    if (duration <= 0)
        throw new ApiError({
            code: "DURATION_INVALID",
            message: "Duration must be positive",
            status: 400,
        });

    if (!stops?.length)
        throw new ApiError({
            code: "STOPS_REQUIRED",
            message: "At least one stop is required",
            status: 400,
        });

    stops.sort((a, b) => a.order - b.order);

    stops.forEach((stop, index) => {
        stop.order = index + 1;

        if (stop.location.type !== "Point")
            throw new ApiError({
                code: "INVALID_LOCATION_TYPE",
                message: "Invalid location type, must be 'Point'",
                status: 400,
            });

        const [lng, lat] = stop.location.coordinates;
        if (lng < -180 || lng > 180 || lat < -90 || lat > 90)
            throw new ApiError({
                code: "INVALID_COORDINATES",
                message: "Coordinates are out of valid range",
                status: 400,
            });
    });

    const tour = await Tour.create({
        city: cityId,
        guide: guide._id,
        title,
        price,
        duration,
        stops,
    });

    return tour;
};

export const getAllToursByGuide = async (userId: string) => {
    const guide = await Guide.findOne({ user: userId });
    if (!guide) throw new ApiError(ERRORS.GUIDE_NOT_FOUND);

    const tours = await Tour.find({ guide: guide._id })
        .populate({ path: "city", select: "name" })
        .sort({ createdAt: -1 });

    return tours;
};
