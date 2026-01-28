import Experience from "../models/experience.model";
import City from "../models/city.model";

export const findNearestExperience = async (
    {
        latitude,
        longitude,
        maxDistance = 200,
        cityId
    }: {
        latitude: any,
        longitude: any,
        maxDistance: any,
        cityId?: any
    }
) => {
    if (!latitude || !longitude) {
        throw new Error("Latitude and longitude are required");
    }

    const query: any = {
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
                $maxDistance: maxDistance
            }
        }
    };

    if (cityId) {
        query.city = cityId;
    }

    return await Experience.findOne(query);
}

export const getExperienceById = async (id: string) => {
    return await Experience.findById(id).populate("city");
}

export const getExperiencesByCity = async (cityName: string) => {
    const city = await City.findOne({ name: new RegExp(`^${cityName}$`, 'i') });
    if (!city) {
        return [];
    }
    const experiences = await Experience
        .find({ city: city._id })
        .exec();

    return experiences;
}

export const searchExperience = async (
    keyword: string) => {
    try {
        if (!keyword) return [];

        const keywordQuery = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        };

        const combinedQuery = {
            ...keywordQuery,
        };

        const results = await Experience.find(combinedQuery)
            .sort({
                rating: -1
            })
            .exec();

        return results;
    } catch (error) {
        console.error('Error searching experiences:', error);
        throw error;
    }
};

export const createExperience = async (data: any) => {
    return await Experience.create(data);
}


