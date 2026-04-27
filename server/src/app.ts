import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/quizzes", quizRoutes);

// Basic Route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "LMS Backend API is running!" });
});

// Health check endpoint
app.get("/health", async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.status(200).json({ status: "OK", database: "connected" });
  } catch (error) {
    res.status(500).json({ status: "Error", database: "disconnected" });
  }
});

// Test Database Connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL database connected successfully!");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    console.log("Please check your .env file and ensure MySQL is running.");
  }
}

testConnection();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
