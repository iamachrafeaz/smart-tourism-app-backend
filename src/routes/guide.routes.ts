import express from "express";
import * as guideController from "../controllers/guide.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { uploadGuideDocs } from "../middlewares/uploadGuideDoc";

const router = express.Router();

router.post(
    "/complete-profile",
    authenticate,
    authorize("GUIDE"),
    uploadGuideDocs.fields([
        { name: "selfie", maxCount: 1 },
        { name: "govId", maxCount: 1 },
        { name: "certifications", maxCount: 5 },
    ]),
    guideController.completeGuideProfileRequest
);

router.get("/",
    guideController.getAllGuidesRequest
);

router.get("/me",
    authenticate,
    authorize("GUIDE"),
    guideController.getGuideMeRequest
)

router.get("/:id", guideController.getGuideByIdRequest);


export default router;
