import express from "express";
import { buildAccount } from "../controllers/accountController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/account", requireAuth, buildAccount);

export default router;