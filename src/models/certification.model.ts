import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    guide: { type: mongoose.Schema.Types.ObjectId, ref: "Guide" },
});

export default mongoose.model("Certification", certificationSchema);
