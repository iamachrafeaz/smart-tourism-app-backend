import Tour from "../models/tour.model";
import Guide from "../models/guide.model";
import City from "../models/city.model";
import ApiError from "../utils/ApiError";
import { getGuideById } from "./guide.service";

export const createTour = async ({
    userId,
    title,
    price,
    duration,
    cityId,
    stops
}: {
    userId: string,
    title: string,
    price: number,
    duration: number,
    cityId: string,
    stops: { order: number, location: { type: "Point", coordinates: number[] } }[]
}) => {

    const guide = await getGuideById(userId);
    if (!guide) throw new ApiError(404, "Guide profile not found");

    const city = await City.findById(cityId);
    if (!city) throw new ApiError(404, "City not found");

    if (!title?.trim()) throw new ApiError(404, "Title is required");
    if (price <= 0) throw new Error("Price must be greater than 0");
    if (duration <= 0) throw new Error("Duration must be positive");
    if (!stops?.length) throw new Error("At least one stop is required");

    stops.sort((a, b) => a.order - b.order);

    stops.forEach((stop, index) => {
        stop.order = index + 1;

        if (stop.location.type !== "Point")
            throw new Error("Invalid location type");

        const [lng, lat] = stop.location.coordinates;
        if (lng < -180 || lng > 180 || lat < -90 || lat > 90)
            throw new Error("Invalid coordinates");
    });

    const tour = await Tour.create(
        {
            city: cityId,
            guide: guide._id,
            title: title,
            price: price,
            duration: duration,
            stops: stops
        }
    );

    return tour;
}

export const getAllToursByGuide = async (userId: string) => {
    const guide = await Guide.findOne({ user: userId });
    if (!guide) throw new ApiError(404, "GUIDE_NOT_FOUND");

    const tours = await Tour.find({ guide: guide._id })
        .populate({ path: "city", select: "name" })
        .sort({ createdAt: -1 });

    return tours;
}