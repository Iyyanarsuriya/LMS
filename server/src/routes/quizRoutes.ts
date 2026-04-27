import { Router } from "express";
import { 
  createQuiz, 
  getQuizzes, 
  getQuizById, 
  submitQuiz, 
  getStudentResults 
} from "../controllers/quizController.js";
import { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = Router();

// Admin operations
router.post("/", authorizeRoles(["admin", "superadmin"]), createQuiz);

// Shared/Student operations
router.get("/", getQuizzes);
router.get("/:id", getQuizById);
router.post("/:id/submit", submitQuiz);
router.get("/results/:studentId", getStudentResults);

export default router;
