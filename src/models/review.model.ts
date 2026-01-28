import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        tourist: { type: mongoose.Schema.Types.ObjectId, ref: "Tourist" },
        guide: { type: mongoose.Schema.Types.ObjectId, ref: "Guide" },
        description: String,
        rating: Number
    },
    { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
