import mongoose from "mongoose";
import { PostTagEnum } from "../enums/postTag.enum";
import { PostTopicEnum } from "../enums/postTopic.enum";

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }],
    tags: [{ type: String, enum: PostTagEnum }],
    topic: [{ type: String, enum: PostTopicEnum }],
    replies: [
      new mongoose.Schema(
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          answer: { type: String, required: true },
        },
        { timestamps: true }
      ),
    ],
    question: { type: String, required: true },
    isGuide: { type: Boolean }
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);


