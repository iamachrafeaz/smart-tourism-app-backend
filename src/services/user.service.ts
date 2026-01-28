import ApiError from '../utils/ApiError';
import User from '../models/user.model';
import { createTouristService } from './tourist.service';
import { createGuide } from './guide.service';

interface CompleteAccountInput {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: Date;
    address: string;
    country: string;
}

export const completeAccount = async (
    userId: string,
    data: CompleteAccountInput
) => {
    const user = await User.findById(userId);

    if (!user) throw new ApiError(404, "USER_NOT_FOUND");

    if (user.isComplete) throw new ApiError(400, "ACCOUNT_ALREADY_COMPLETED");

    await User.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true, runValidators: true }
    );
};

export const chooseUserRole = async (
    userId: string,
    role: string
) => {
    const user = await User.findById(userId);

    if (!user) throw new ApiError(404, "USER_NOT_FOUND");

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $set: { role: role }
        },
        {
            new: true
        }
    );

    if (role == "TOURIST") {
        updatedUser!.isActive = true;
        await updatedUser!.save()
        await createTouristService(updatedUser!.id);
    } else if (role == "GUIDE") {
        await createGuide(updatedUser!.id)
    }
}

export const updateProfilePhoto = async (userId: string, photoPath: string) => {

    const user = await User.findByIdAndUpdate(
        userId,
        { profilePictureUrl: photoPath },
        { new: true }
    ).select("firstName lastName photo");

    return user;
}