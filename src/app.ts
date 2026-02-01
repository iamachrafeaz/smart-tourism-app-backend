import express from "express";
import authRoutes from "./routes/auth.routes";
import guideRoutes from "./routes/guide.routes";
import experienceRoutes from "./routes/experience.routes";
import bookingRoutes from "./routes/booking.routes";
import postRoutes from "./routes/post.routes";
import ApiError from "./utils/ApiError";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import tourRoutes from "./routes/tour.routes";
import reviewsRoutes from "./routes/review.routes";
import cors from "cors";
import path from "path";


dotenv.config();

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/posts", postRoutes);

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);

    if (err.name === "ZodError") {
        return res.status(400).json({
            success: false,
            errors: err.errors
        });
    }
    if (err instanceof ApiError) {
        res.status(err.status).json({ success: false, error: err.getErrorObject() });
    } else {
        res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: 'Internal server error' } });
    }
});

export default app;
