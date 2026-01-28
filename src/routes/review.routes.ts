import express from 'express'
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { createReviewRequest } from '../controllers/review.controller';
import { validate } from '../middlewares/validate.middleware';
import { createReviewSchema } from '../validators/review.validator';

const router = express.Router();

router.post('/',
    authenticate,
    authorize("TOURIST"),
    validate(createReviewSchema),
    createReviewRequest);

export default router;