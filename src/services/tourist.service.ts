import Tourist from "../models/tourist.model"

export const createTouristService = async (userId: string) => {
    return await Tourist.create({
        user: userId
    });
}