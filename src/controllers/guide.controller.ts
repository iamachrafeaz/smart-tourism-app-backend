import { success } from "zod";
import * as guideService from "../services/guide.service";
import { guideProfileView, guidesList } from "../views/guide.view";

export const completeGuideProfileRequest = async (req: any, res: any, next: any) => {
    try {
        const { languages, fee, city, description, expertise } = JSON.parse(req.body.data);

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const selfiePath = files?.selfie?.[0]?.path || null;
        const idPath = files?.govId?.[0]?.path || null;
        const certificationsPaths =
            files?.certifications?.map(f => f.path) || null;

        const user = req.user;

        await guideService.completeGuideProfile(user.id, languages, description, expertise, fee, city, selfiePath, idPath, certificationsPaths);

        res.status(200).json({
            success: true
        });
    } catch (err) {
        next(err);
    }
}

export const getGuideMeRequest = async (req: any, res: any, next: any) => {
    try {
        const userId = req.user.id;
        const guide = await guideService.getGuideMe(userId);

        res.json({
            success: true,
            data: guide
        });
    } catch (error) {
        next(error)
    }
}

export const getAllGuidesRequest = async (req: any, res: any, next: any) => {
    try {
        const guides = await guideService.getAllGuides();

        let responseData = guidesList(guides);
        console.log(guides);
        res.json({ success: true, data: responseData });
    } catch (err) {
        next(err);
    }
}

export const getGuideByIdRequest = async (req: any, res: any, next: any) => {
    try {
        const { id } = req.params;
        const guideProfile = await guideService.getGuideById(id);

        let responseData;

        responseData = guideProfileView(guideProfile)

        res.status(200).json({
            success: true,
            data: responseData
        });
    } catch (err) {
        next(err);
    }
}