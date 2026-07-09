import express from "express";
import { buildAbout } from "../controllers/baseController.js";
import { buildHome } from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/", buildHome);
router.get("/about", buildAbout);

export default router;