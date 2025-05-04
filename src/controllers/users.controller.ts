import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password, repassword, gender, role, avatar } =
    req.body;

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
        res.status(400).json({ error: "Invalid email format" });
    if (!username || !email || !password || !gender || !role || !avatar) {
        res.status(400).json({ error: "All fields are required" });
    }
    if (username.length < 6)
        res
        .status(400)
        .json({ error: "Username must be at least 6 characters" });
    if (password.length < 8)
        res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    if (password !== repassword)
        res.status(400).json({ error: "Passwords do not match" });

    const emailCheck = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (emailCheck.rows.length > 0) {
        res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (username, email, password, gender, role, avatar)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, username, email, gender, role, avatar, uid, mobacoin, popularity`,
      [username, email, hashedPassword, gender, role, avatar]
    );

    const user = result.rows[0];
    const UserToken = jwt.sign({ userId: user.id, UID: user.uid }, JWT_SECRET, {
      expiresIn: "3000h",
    });

    res.status(201).json({
      UserToken,
      UserData: {
        username: user.username,
        email: user.email,
        gender: user.gender,
        role: user.role,
        avatar: user.avatar,
        UID: user.uid,
        popularity: user.popularity,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { identifier, password } = req.body;

  try {
    if (!identifier || !password) {
       res
        .status(400)
        .json({ error: "(email or username) and password are required" });
    }

    const result = await pool.query(
      `SELECT id, username, email, password, gender, role, avatar, uid, mobacoin, popularity 
       FROM users 
       WHERE email = $1 OR username = $1`,
      [identifier]
    );

    if (result.rows.length === 0) {
       res
        .status(401)
        .json({ error: "Wrong email, username, or password!" });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
       res
        .status(401)
        .json({ error: "Wrong email, username, or password!" });
    }

    const UserToken = jwt.sign({ userId: user.id, UID: user.uid }, JWT_SECRET, {
      expiresIn: "3000h",
    });

    res.json({
      UserToken,
      UserData: {
        username: user.username,
        email: user.email,
        gender: user.gender,
        role: user.role,
        avatar: user.avatar,
        UID: user.uid,
        popularity: user.popularity,
      },
    });
  } catch (error) {
    next(error);
  }
};
