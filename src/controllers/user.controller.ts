import { chooseUserRole, completeAccount, getMe, updateProfilePhoto } from "../services/user.service";
import ApiError from "../utils/ApiError";

export const completeAccountRequest = async (req: any, res: any, next: any) => {
    const userId = req.user.id;

    try {
        await completeAccount(userId, req.body);

        res.status(200).json({
            success: true,
            message: "ACCOUNT_COMPLETED_SUCCESSFULLY",
        });
    } catch (err) {
        next(err)
    }
};

export const chooseUserRoleRequest = async (req: any, res: any, next: any) => {
    const userId = req.user.id;
    const { role } = req.body;

    try {
        await chooseUserRole(userId, role);
        res.status(200).json({
            success: true,
            message: "ROLE_ADD_SUCCESSFULLY",
        });
    } catch (err) {
        next(err);
    }
}

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

    res.json({
        success: true,
        user
    })
}