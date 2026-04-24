import type { Request, Response } from "express";
import pool from "../config/db.js";

export const addStudent = async (req: Request, res: Response) => {
  const { full_name, username, email, password } = req.body;

  try {
    // Insert into users table with 'student' role
    const [result]: any = await pool.query(
      "INSERT INTO users (full_name, username, email, password, role) VALUES (?, ?, ?, ?, 'student')",
      [full_name, username, email, password]
    );

    res.status(201).json({ 
      message: "Student added successfully", 
      studentId: result.insertId 
    });
  } catch (error: any) {
    console.error("Error adding student:", error);
    
    // Handle duplicate entry (MySQL error 1062)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ 
        message: "Username or Email already exists" 
      });
    }

    res.status(500).json({ 
      message: "Internal server error while adding student", 
      error: error.message 
    });
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT id, full_name, username, email, status, created_at FROM users WHERE role = 'student'");
    res.json(rows);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
};
