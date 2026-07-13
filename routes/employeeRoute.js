import express from "express";
import {
  buildDashboard,
  buildEditVehicle,
  submitEditVehicle,
  moderateReview
} from "../controllers/employeeController.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/employee", requireAuth, requireRole("employee", "owner"));

router.get("/employee/dashboard", buildDashboard);
router.get("/employee/vehicles/:id/edit", buildEditVehicle);
router.post("/employee/vehicles/:id/edit", submitEditVehicle);
router.post("/employee/reviews/:id/delete", moderateReview);

export default router;