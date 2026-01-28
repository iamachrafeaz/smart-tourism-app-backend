import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { createTourRequest } from "../controllers/tour.controller";

const router = express.Router();

router.post("/", authenticate, authorize("GUIDE"), createTourRequest);

export default router;