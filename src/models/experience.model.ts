import mongoose from "mongoose";
import { ExperienceAccessTypeEnum } from "../enums/experienceAccessType.enum";
import { ExperienceCategoryEnum } from "../enums/experienceCategory.enum";
import { ExperienceFrequencyEnum } from "../enums/experienceFrequency.enum";

const experienceSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (v: any) => v.length === 2,
          message: "Coordinates must be [longitude, latitude]"
        }
      }
    },

    longitude: Number,
    latitude: Number,

    address: String,
    rating: { type: Number, default: 0 },
    imageUrl: [{ type: String }],
    frequency: { type: String, enum: ExperienceFrequencyEnum },
    category: { type: String, enum: ExperienceCategoryEnum },
    accessType: { type: String, enum: ExperienceAccessTypeEnum },
    tips: [{ type: String }],
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" }
  },
  { timestamps: true }
);

experienceSchema.index({ location: "2dsphere" });

export default mongoose.model("Experience", experienceSchema);
