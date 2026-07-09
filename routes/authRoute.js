import express from "express";
import {
  buildRegister,
  registerAccount,
  buildLogin,
  loginAccount,
  logoutAccount
} from "../controllers/authController.js";

const router = express.Router();

router.get("/register", buildRegister);
router.post("/register", registerAccount);
router.get("/login", buildLogin);
router.post("/login", loginAccount);
router.post("/logout", logoutAccount);

export default router;