import express from "express";
import { buildContact, submitContact } from "../controllers/contactController.js";

const router = express.Router();

router.get("/contact", buildContact);
router.post("/contact", submitContact);

export default router;