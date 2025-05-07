import { Request, Response } from "express";
import * as postService from "./post.service";
import jwt from "jsonwebtoken";
import { any } from "zod";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const createPost = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  //   if (!token) return res.status(401).json({ error: "No token provided" });
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const userId = decoded.userId;

    const { body } = req.body;
    const files = req.files;

    const result = await postService.createPostService(userId, body, files);
    res.status(201).json(result);
  } catch (error: any) {
    console.error("Create Post Error:", error);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  //   if (!token) return res.status(401).json({ error: "No token provided" });
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const userId = decoded.userId;

    const postId = parseInt(req.params.id);

    const result = await postService.deletePostService(userId, postId);
    res.status(result.status).json(result.data);
  } catch (error: any) {
    console.error("Delete Post Error:", error);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const userId = decoded.userId;
    const postId = parseInt(req.params.id);
    const { body } = req.body;
    const files = req.files;

    const result = await postService.updatePostService(userId, postId, body, files);
    res.status(result.status).json(result.data);
  } catch (error: any) {
    console.error("Update Post Error:", error);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
};
