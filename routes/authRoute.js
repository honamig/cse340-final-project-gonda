import express from "express";
import { buildRegister, registerAccount } from "../controllers/authController.js";

const router = express.Router();

router.get("/register", buildRegister);
router.post("/register", registerAccount);

export default router;