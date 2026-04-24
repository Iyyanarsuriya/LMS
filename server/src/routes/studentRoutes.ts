import { Router } from "express";
import { addStudent, getStudents } from "../controllers/studentController.js";
import { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = Router();

// Only admin and superadmin can add students
router.post("/", authorizeRoles(["admin", "superadmin"]), addStudent);

// Admins and superadmins can view student lists
router.get("/", authorizeRoles(["admin", "superadmin"]), getStudents);

export default router;




