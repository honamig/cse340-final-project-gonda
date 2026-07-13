import express from "express";
import { submitReview, buildEditReview, submitEditReview, removeReview } from "../controllers/reviewController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/vehicle/:id/reviews", requireAuth, submitReview);
router.get("/reviews/:id/edit", requireAuth, buildEditReview);
router.post("/reviews/:id/edit", requireAuth, submitEditReview);
router.post("/reviews/:id/delete", requireAuth, removeReview);

export default router;