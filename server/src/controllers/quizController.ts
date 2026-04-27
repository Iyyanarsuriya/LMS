import type { Request, Response } from "express";
import pool from "../config/db.js";

// Create a new quiz
export const createQuiz = async (req: Request, res: Response) => {
  const { title, description, course_id, time_limit, scheduled_at, expires_at, status, questions } = req.body;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Insert Quiz
    const [quizResult]: any = await connection.query(
      "INSERT INTO quizzes (title, description, course_id, time_limit, scheduled_at, expires_at, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, description, course_id, time_limit, scheduled_at, expires_at, status || 'draft']
    );
    const quizId = quizResult.insertId;

    // 2. Insert Questions and Options
    if (questions && Array.isArray(questions)) {
      for (const q of questions) {
        const [qResult]: any = await connection.query(
          "INSERT INTO questions (quiz_id, question_text, question_type, points) VALUES (?, ?, ?, ?)",
          [quizId, q.question_text, q.question_type || 'multiple_choice', q.points || 1]
        );
        const questionId = qResult.insertId;

        if (q.options && Array.isArray(q.options)) {
          for (const opt of q.options) {
            await connection.query(
              "INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)",
              [questionId, opt.option_text, opt.is_correct ? 1 : 0]
            );
          }
        }
      }
    }

    await connection.commit();
    res.status(201).json({ message: "Quiz created successfully", quizId });
  } catch (error: any) {
    await connection.rollback();
    console.error("❌ ERROR CREATING QUIZ:", error);
    res.status(500).json({ 
      message: "Failed to create quiz", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  } finally {
    connection.release();
  }
};

// Get all quizzes
export const getQuizzes = async (req: Request, res: Response) => {
  const role = req.headers["x-user-role"] as string;
  const studentId = req.headers["x-user-id"];

  try {
    let query = "SELECT q.*, c.title as course_title FROM quizzes q LEFT JOIN courses c ON q.course_id = c.id";
    let params: any[] = [];

    if (role === 'student') {
      // Students see all active or scheduled quizzes (bypassing course enrollment check for now)
      query = `
        SELECT q.*, c.title as course_title 
        FROM quizzes q 
        LEFT JOIN courses c ON q.course_id = c.id
        WHERE q.status = 'active' OR (q.status = 'draft' AND q.scheduled_at <= NOW())
      `;
      // params = [studentId]; // Not needed if we don't filter by student enrollment
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error: any) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Failed to fetch quizzes" });
  }
};

// Get quiz by ID with questions and options
export const getQuizById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [quizRows]: any = await pool.query("SELECT * FROM quizzes WHERE id = ?", [id]);
    if (quizRows.length === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const quiz = quizRows[0];

    const [questionRows]: any = await pool.query("SELECT * FROM questions WHERE quiz_id = ?", [id]);
    
    const questionsWithOptions = await Promise.all(questionRows.map(async (q: any) => {
      const [optionRows] = await pool.query("SELECT id, option_text, is_correct FROM options WHERE question_id = ?", [q.id]);
      // If student, remove is_correct info
      const role = req.headers["x-user-role"];
      const options = role === 'student' 
        ? (optionRows as any[]).map(({ is_correct, ...rest }) => rest)
        : optionRows;
        
      return { ...q, options };
    }));

    res.json({ ...quiz, questions: questionsWithOptions });
  } catch (error: any) {
    console.error("Error fetching quiz details:", error);
    res.status(500).json({ message: "Failed to fetch quiz details" });
  }
};

// Submit quiz response
export const submitQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { student_id, responses } = req.body; // responses: { question_id: selected_option_id }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Create Attempt
    const [attemptResult]: any = await connection.query(
      "INSERT INTO quiz_attempts (quiz_id, student_id) VALUES (?, ?)",
      [id, student_id]
    );
    const attemptId = attemptResult.insertId;

    let totalScore = 0;

    // 2. Save Responses and Calculate Score
    for (const [qId, optId] of Object.entries(responses)) {
      await connection.query(
        "INSERT INTO quiz_responses (attempt_id, question_id, selected_option_id) VALUES (?, ?, ?)",
        [attemptId, qId, optId]
      );

      // Check if correct
      const [optRows]: any = await connection.query(
        "SELECT is_correct FROM options WHERE id = ? AND question_id = ?",
        [optId, qId]
      );
      
      if (optRows.length > 0 && optRows[0].is_correct) {
        const [qRows]: any = await connection.query("SELECT points FROM questions WHERE id = ?", [qId]);
        totalScore += qRows[0].points;
      }
    }

    // 3. Update Attempt with Score and Completion Time
    await connection.query(
      "UPDATE quiz_attempts SET score = ?, completed_at = NOW() WHERE id = ?",
      [totalScore, attemptId]
    );

    await connection.commit();
    res.json({ message: "Quiz submitted successfully", score: totalScore, attemptId });
  } catch (error: any) {
    await connection.rollback();
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: "Failed to submit quiz" });
  } finally {
    connection.release();
  }
};

// Get quiz results for a student
export const getStudentResults = async (req: Request, res: Response) => {
  const { studentId } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT qa.*, q.title as quiz_title, c.title as course_title 
       FROM quiz_attempts qa 
       JOIN quizzes q ON qa.quiz_id = q.id 
       JOIN courses c ON q.course_id = c.id
       WHERE qa.student_id = ? 
       ORDER BY qa.completed_at DESC`,
      [studentId]
    );
    res.json(rows);
  } catch (error: any) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: "Failed to fetch results" });
  }
};
