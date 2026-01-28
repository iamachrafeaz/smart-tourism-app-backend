import * as postService from "../services/post.service"; // adjust path if needed

import ApiError from "../utils/ApiError";
import { postDetail, postList } from "../views/post.view";

export const createPostRequest = async (req: any, res: any, next: any) => {
    try {
        const userId = req.user.id;
        const { question, tags, topic } = req.body;

        if (!question) {
            throw new ApiError(400, "MISSING_REQUIRED_FIELDS");
        }

        const post = await postService.createPost({
            userId,
            question,
            tags,
            topic
        });

        res.status(201).json({
            success: true,
            message: "POST_CREATED_SUCCESSFULLY",
            data: post
        });
    } catch (err) {
        next(err);
    }
};

export const likePostController = async (req: any, res: any, next: any) => {
    try {
        const { postId } = req.body;

        const userId = req.user.id;

        if (!userId || !postId) {
            return res.status(400).json({ message: "Missing userId or postId" });
        }

        const result = await postService.likePost({ userId, postId });

        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const addCommentController = async (req: any, res: any, next: any) => {
    try {
        const { postId, answer } = req.body;

        const userId = req.user.id;

        if (!userId || !postId || !answer) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await postService.addCommentToPost({ userId, postId, answer });

        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const getPostByIdRequest = async (req: any, res: any, next: any) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ message: "Missing postId parameter" });
        }

        const post = await postService.getPostById(postId);


        res.status(200).json({
            success: true,
            data: postDetail(post)
        });
    } catch (error) {
        next(error);
    }
};

export const getAllPostsRequest = async (req: any, res: any, next: any) => {
    try {
        const userId = req.user.id;
        const posts = await postService.getAllPosts(userId);

        let responseData: any = postList(posts);

        res.status(200).json({
            success: true,
            data: responseData
        });
    } catch (err) {
        next(err)
    }
}