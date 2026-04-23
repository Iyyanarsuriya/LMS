import type { Request, Response } from "express";
import pool from "../config/db.js";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let role = "student";
  let message = "Login successful";

  // Mock logic for roles
  if (email === "superadmin@gmail.com" && password === "superadmin@123") {
    role = "superadmin";
  } else if (email === "admin@gmail.com" && password === "admin@123") {
    role = "admin";
  } else if (email === "student@gmail.com" && password === "student@123") {
    role = "student";
  }

  res.json({ 
    message, 
    token: "mock-jwt-token",
    user: { email, role } 
  });
};

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  res.json({ message: "Account created successfully (Mock)", user: { username, email } });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  res.json({ message: "Password reset link sent to " + email });
};
