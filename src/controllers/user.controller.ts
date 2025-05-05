import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {
  createUser,
  findUserByEmailOrUsername,
  isEmailExists,
} from "../services/user.service";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { repassword, ...userData } = req.body;

    if (await isEmailExists(userData.email)) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    const user = await createUser(userData);

    const token = jwt.sign({ userId: user.id, UID: user.uid }, JWT_SECRET, {
      expiresIn: "3000h",
    });

    res.status(201).json({
      token,
      user: {
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
) => {
  try {
    const { identifier, password } = req.body;

    const user = await findUserByEmailOrUsername(identifier);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Invalid email, username, or password." });
      return;
    }

    const token = jwt.sign({ userId: user.id, UID: user.uid }, JWT_SECRET, {
      expiresIn: "3000h",
    });

    res.json({
      token,
      user: {
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
