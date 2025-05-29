import { Request, Response } from "express";
import * as postService from "./post.service";
import { getHomePostsService, getFeedPostsService } from "./post.service";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string;

export const createPost = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const userId = decoded.userId;

    const { body } = req.body;
    const files = req.files;
    if(!files || (Array.isArray(files) && files.length === 0)){
      res.status(400).json({ error: "No files uploaded" });
      return;
    }
    const result = await postService.createPostService(userId, files, body);
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
    const textBody = req.body.body;
    const files = req.files;

    const result = await postService.updatePostService(
      userId,
      postId,
      textBody,
      files
    );
    res.status(result.status).json(result.data);
    return;
  } catch (error: any) {
    console.error("Update Post Error:", error);
    res.status(500).json({ error: "Internal server error: " + error.message });
    return;
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  //   if (!token) return res.status(401).json({ error: "No token provided" });
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }
  const { postId, commentId } = req.params;
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
  const userId = decoded.userId;
  try {
    await postService.deleteComment(+userId, +postId, +commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// src/modules/posts/post.controller.ts
export const likePost = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }
  const { id: postId } = req.params;
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
  const userId = decoded.userId;
  try {
    await postService.likePost(userId, +postId);
    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to like post" });
  }
};

export const unlikePost = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }
  const { id: postId } = req.params;
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
  const userId = decoded.userId;
  try {
    await postService.unlikePost(userId, +postId);
    res.status(200).json({ message: "Post unliked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to unlike post" });
  }
};

export const addComment = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }
  const { id: postId } = req.params;
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
  const userId = decoded.userId;
  const { content } = req.body;

  try {
    const comment = await postService.addComment(userId, +postId, content);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

export const getComments = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }
  const { id: postId } = req.params;

  try {
    const comments = await postService.getComments(+postId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const getHomePosts = async (req: Request, res: Response) => {
  try {
    const posts = await getHomePostsService();
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeedPosts = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const userId = decoded.userId;
    const posts = await getFeedPostsService(userId);
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};