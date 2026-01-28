import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import Booking from "../models/booking.model";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("TOURIST"),
    async (req: any, res: any) => {
        const booking = await Booking.create({
            tourist: req.user.id,
            ...req.body,
        });
        res.status(201).json(booking);
    }
);

router.get(
    "/my",
    authenticate,
    authorize("TOURIST"),
    async (req: any, res: any) => {
        const bookings = await Booking.find({ tourist: req.user.id })
            .populate("experience");
        res.json(bookings);
    }
);

export default router;
