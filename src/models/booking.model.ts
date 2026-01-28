import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tourist: { type: mongoose.Schema.Types.ObjectId, ref: "Tourist" },
    experience: { type: mongoose.Schema.Types.ObjectId, ref: "Experience" },
    duration: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
