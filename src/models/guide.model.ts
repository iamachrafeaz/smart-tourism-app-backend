import mongoose from "mongoose";
import { GuideLanguagesEnum } from "../enums/guideLanguages.enum";

const guideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  fee: Number,
  certifications: [{
    url: String
  }],
  rating: { type: Number, default: 0 },
  description: String,
  languages: [{ type: String, enum: GuideLanguagesEnum }],
  expertise: [{ type: String }],
  responseTime: Number,
  isAvailable: Boolean,
  isVerified: Boolean
});



export default mongoose.model("Guide", guideSchema);
