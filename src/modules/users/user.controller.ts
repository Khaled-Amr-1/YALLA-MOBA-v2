import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {
  createUser,
  findUserByEmailOrUsername,
  isEmailExists,
} from "./user.service";
import * as userService from "./user.service";

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

    const userToken = jwt.sign({ userId: user.id, UID: user.uid }, JWT_SECRET, {
      expiresIn: "3000h",
    });

    res.json({
      userToken,
      userData: {
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

export const followUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }
  const { id: followingId } = req.params;
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
  const followerId = decoded.userId;

  try {
    await userService.followUser(+followerId, +followingId);
    res.status(200).json({ message: "Followed successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }
  const { id: followingId } = req.params;
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const followerId = decoded.userId;

  try {
    await userService.unfollowUser(+followerId, +followingId);
    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getFollowers = async (req: Request, res: Response) => {

  const { id: userId } = req.params;
  try {
    const followers = await userService.getFollowers(+userId);
    res.status(200).json(followers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFollowing = async (req: Request, res: Response) => {

  const { id: userId } = req.params;
  try {
    const following = await userService.getFollowing(+userId);
    res.status(200).json(following);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};