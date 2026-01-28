import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  title: String,
  price: Number,
  duration: Number,
  stops: [
    {
      order: { type: Number },
      location: {
        type: {
          type: String,
          enum: ["Point"],
          required: true,
          default: "Point"
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
    }
  ],

  guide: { type: mongoose.Schema.Types.ObjectId, ref: "Guide" },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
});


tourSchema.index({ "stops.location": "2dsphere" });


export default mongoose.model("Tour", tourSchema);
