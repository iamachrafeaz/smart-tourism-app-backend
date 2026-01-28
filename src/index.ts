import app from "./app";
import connectDB from "./config/db.config";

const PORT = process.env.PORT || 50000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ DB connection failed", err);
    });