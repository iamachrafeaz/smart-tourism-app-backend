import { PostTagEnum } from "../enums/postTag.enum";
import { PostTopicEnum } from "../enums/postTopic.enum";
import postModel from "../models/post.model";
import User from '../models/user.model'
import ApiError from "../utils/ApiError";

export const createPost = async (props: {
    userId: string,
    question: string,
    tags: typeof PostTagEnum,
    topic: typeof PostTopicEnum
}) => {
    const user = await User.findById(props.userId);

    if (!user) throw new ApiError(404, "NOT FOUND");

    const isGuide = user.role == "GUIDE";

    const post = await postModel.create({
        user: user.id,
        isGuide: isGuide,
        ...props
    });

    return post;
}

export const likePost = async (props: { userId: string; postId: string }) => {
    const user = await User.findById(props.userId);
    if (!user) throw new ApiError(404, "USER_NOT_FOUND");

    const post = await postModel.findById(props.postId);
    if (!post) throw new ApiError(404, "POST_NOT_FOUND");

    const alreadyLiked = post.likes.some(
        (l) => l.user && l.user.equals(props.userId)
    );

    if (alreadyLiked) {
        post.likes.pull({ user: props.userId });
    } else {
        post.likes.push({ user: props.userId });
    }
    await post.save();

    const updatedPost = await postModel.findById(props.postId).lean();

    return {
        liked: !alreadyLiked,
        totalLikes: updatedPost!.likes.length,
    };
};

export const addCommentToPost = async (props: {
    userId: string;
    postId: string;
    answer: string;
}) => {
    const user = await User.findById(props.userId);
    if (!user) throw new ApiError(404, 'USER_NOT_FOUND');

    const post = await postModel.findById(props.postId);
    if (!post) throw new ApiError(404, 'POST_NOT_FOUND');

    post.replies.push({
        user: props.userId,
        answer: props.answer,
    });

    await post.save();

    return {
        commentCount: post.replies.length,
        latestComment: post.replies[post.replies.length - 1],
    };
};

export const getPostById = async (postId: string) => {
    const post = await postModel.findById(postId).populate([{
        path: 'replies.user',
        select: 'firstName lastName profilePictureUrl role',
    }, {
        path: 'user',
        select: 'firstName lastName profilePictureUrl role',
    }
    ]);


    if (!post) throw new ApiError(404, 'POST_NOT_FOUND');

    return post;
};

export const getAllPosts = async (userId: string) => {
    const posts = await postModel.find().populate({
        path: "user",
        select: "firstName lastName profilePictureUrl"
    }).lean();

    if (!posts) throw new ApiError(404, 'POST_NOT_FOUND');

    const postsWithLikeState: any = posts.map((post) => ({
        ...post,
        hasLiked: post.likes.some((like: any) => {
            return like.user.toString() === userId
        }),
    }));



    return postsWithLikeState;
};