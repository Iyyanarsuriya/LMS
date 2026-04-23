import { Router } from "express";
import { login, signup, forgotPassword } from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);

export default router;
