import mongoose from "mongoose";

const touristSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  interests: [{ type: String }],
});

export default mongoose.model("Tourist", touristSchema);
