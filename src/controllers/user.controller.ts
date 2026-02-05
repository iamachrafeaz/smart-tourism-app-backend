import { getMe, updateProfilePhoto } from "../services/user.service";
import ApiError from "../utils/ApiError";

export const updateProfilePhotoRequest = async (req: any, res: any, next: any) => {
    try {
        //  if (!req.file) throw new ApiError(400, "PHOTO_REQUIRED");

        const userId = req.user.id;
        const photoPath = `/uploads/profile/${req.file.filename}`;

        const user = await updateProfilePhoto(userId, photoPath);

        res.json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err)
    }
};

export const getMeRequest = async (req: any, res: any, next: any) => {
    const userId = req.user.id;
    const user = await getMe(userId);
    const { _id, ...rest } = user

    res.json({
        success: true,
        user: {
            id: _id,
            ...rest
        }
    })
}