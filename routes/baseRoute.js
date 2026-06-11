import express from "express";
import { buildHome, buildAbout } from "../controllers/baseController.js";

const router = express.Router();

router.get("/", buildHome);
router.get("/about", buildAbout);

export default router;