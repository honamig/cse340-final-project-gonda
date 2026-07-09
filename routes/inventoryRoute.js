import express from "express";
import { buildInventoryIndex, buildByCategory } from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/inventory", buildInventoryIndex);
router.get("/inventory/:category", buildByCategory);

export default router;