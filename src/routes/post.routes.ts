import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createPostRequest, likePostController, addCommentController, getPostByIdRequest, getAllPostsRequest } from "../controllers/post.controller";

const router = express.Router();

router.post("/", authenticate, createPostRequest)

router.post("/like", authenticate, likePostController);

router.post("/comment", authenticate, addCommentController);

router.get("/:postId", getPostByIdRequest);

router.get("/", authenticate, getAllPostsRequest);


export default router;