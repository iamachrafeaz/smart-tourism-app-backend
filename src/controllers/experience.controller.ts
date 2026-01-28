import { createExperience, findNearestExperience, getExperienceById, getExperiencesByCity, searchExperience } from "../services/experience.service";
import { experienceDetail, experiencesList } from "../views/experience.view";

export const getNearestExperienceRequest = async (req: any, res: any) => {
    try {
        const { lat, lng, maxDistance, cityId } = req.query;
        const experience = await findNearestExperience({
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            maxDistance: maxDistance ? parseInt(maxDistance) : 10000,
            cityId
        });

        if (!experience) {
            return res.status(404).json({
                message: "No nearby experience found"
            });
        }

        return res.status(200).json({
            experience
        });
    } catch (error: any) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export const getExperienceByIdRequest = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const experience = await getExperienceById(id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                error: "NOT_FOUND"
            });
        }

        let responseData = experienceDetail(experience)


        res.status(200).json({
            success: false,
            data: responseData
        });
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

export const createExperienceRequest = async (req: any, res: any) => {
    try {
        const experience = await createExperience(req.body);
        res.status(201).json({ experience });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export const getExperiencesByCityRequest = async (req: any, res: any) => {
    try {
        const city = req.params.city;
        const experiences = await getExperiencesByCity(city);
        const responseData = experiencesList(experiences)
        res.status(201).json({ success: true, data: responseData });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export const searchExperienceRequest = async (req: any, res: any) => {
    const keyword = req.query.keyword;
    const searchResults = await searchExperience(keyword);
    res.status(201).json({ searchResults });
}