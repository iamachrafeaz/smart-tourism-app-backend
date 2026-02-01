import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { createExperienceRequest, getExperienceByIdRequest, getExperiencesByCityRequest, getNearestExperienceRequest, searchExperienceRequest } from "../controllers/experience.controller";
import { createExperienceSchema } from "../validators/experience.validator";
import { validate } from "../middlewares/validate.middleware";
import { uploadProfilePhoto } from "../middlewares/uploadProfilePhoto";

const router = express.Router();

// Admin only
router.post(
    "/",
    authenticate,
    // authorize("ADMIN"),
    validate(createExperienceSchema),
    uploadProfilePhoto.single("experiencePhoto"),
    createExperienceRequest
);

// Public
router.get("/nearest", getNearestExperienceRequest);

router.get("/by-city/:city", getExperiencesByCityRequest);

router.get("/search", searchExperienceRequest);

router.get("/:id", getExperienceByIdRequest);


export default router;
