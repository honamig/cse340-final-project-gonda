import express from "express";
import { buildVehicleDetail } from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/vehicle/:id", buildVehicleDetail);

export default router;