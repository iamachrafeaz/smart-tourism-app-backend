import express from "express";
import { completeGuideProfileRequest, getAllGuidesRequest, getGuideByIdRequest } from "../controllers/guide.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("GUIDE"),
    completeGuideProfileRequest
);

router.get("/",
    getAllGuidesRequest
);

router.get("/:id", getGuideByIdRequest);


export default router;
