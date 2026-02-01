import ApiError from '../utils/ApiError';
import User from '../models/user.model';
import { createTouristService } from './tourist.service';
import { createGuide } from './guide.service';
import { ERRORS } from '../../constants/error.constants';


export const updateProfilePhoto = async (userId: string, photoPath: string) => {

    const user = await User.findByIdAndUpdate(
        userId,
        { profilePictureUrl: photoPath },
        { new: true }
    ).select("firstName lastName photo");

    return user;
}

export const getMe = async (userId: string) => {
    const user = await User.findById(userId).select("_id role firstName lastName email profilePictureUrl").lean();

    if (!user) throw new ApiError(ERRORS.USER_NOT_FOUND)
    return user;
}
