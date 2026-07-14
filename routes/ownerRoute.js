import express from "express";
import {
  buildDashboard,
  buildAddCategory,
  submitAddCategory,
  removeCategory,
  buildAddVehicle,
  submitAddVehicle,
  removeVehicle,
  submitAddEmployee
} from "../controllers/ownerController.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/owner", requireAuth, requireRole("owner"));

router.get("/owner/dashboard", buildDashboard);
router.get("/owner/categories/add", buildAddCategory);
router.post("/owner/categories/add", submitAddCategory);
router.post("/owner/categories/:id/delete", removeCategory);
router.get("/owner/vehicles/add", buildAddVehicle);
router.post("/owner/vehicles/add", submitAddVehicle);
router.post("/owner/vehicles/:id/delete", removeVehicle);
router.post("/owner/employees/add", submitAddEmployee);

export default router;