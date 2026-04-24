import type { Request, Response } from "express";
import pool from "../config/db.js";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [rows]: any = await pool.query(
      "SELECT id, full_name, username, email, role, status FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    if (user.status !== 'active') {
      return res.status(403).json({ message: `Account is ${user.status}. Please contact support.` });
    }

    res.json({ 
      message: "Login successful", 
      token: "mock-jwt-token-" + user.id, // Still mock JWT for now
      user: {
        id: user.id,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
        role: user.role
      } 
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error during login" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  res.json({ message: "Account created successfully (Mock)", user: { username, email } });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  res.json({ message: "Password reset link sent to " + email });
};
