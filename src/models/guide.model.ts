import mongoose from "mongoose";
import { GuideLanguagesEnum } from "../enums/guideLanguages.enum";

const guideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  fee: Number,
  certifications: [{
    url: String,
    verificationStatus: { type: String, enum: ["PENDING", "REFUSED", "APPROVED"] }
  }],
  idPath: { url: String, verificationStatus: { type: String, enum: ["PENDING", "REFUSED", "APPROVED"] } },
  selfiePath: { url: String, verificationStatus: { type: String, enum: ["PENDING", "REFUSED", "APPROVED"] } },
  rating: { type: Number, default: 0 },
  description: String,
  languages: [{ type: String, enum: GuideLanguagesEnum }],
  expertise: [{ type: String }],
  responseTime: Number,
  isAvailable: Boolean,
  verificationStatus: { type: String, enum: ["PENDING", "REFUSED", "APPROVED", "UNVERIFIED"] },
});



export default mongoose.model("Guide", guideSchema);
