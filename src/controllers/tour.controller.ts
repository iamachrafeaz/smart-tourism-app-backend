import { createTour, getAllToursByGuide } from "../services/tour.service";

export const createTourRequest = async (req: any, res: any, next: any) => {
    try {
        const userId = req.user.id;

        const data = req.body;

        const tour = await createTour({
            userId,
            ...data
        });

        res.status(201).json({
            success: true,
            data: tour
        });
    } catch (err) {
        next(err)
    }
};

export const getAllToursByGuideRequest = async (req: any, res: any, next: any) => {
    try {
        const userId = req.user.id;
        const tours = await getAllToursByGuide(userId);

        return res.json({ success: true, data: tours });
    } catch (err) {
        next(err)
    }
}
