import express from "express";
import { submitServiceRequest } from "../controllers/serviceRequestController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/vehicle/:id/service-requests", requireAuth, submitServiceRequest);

export default router;