import { Request, Response, NextFunction } from "express";
import {
  getUserWithPosts,
  updateUserInfo,
  isUsernameTaken,
} from "./profile.service";
import { getsearchUser } from "./profile.service"; // Assuming this is the correct import path

export const searchUser = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;  // Get name from request body

    if (!name || typeof name !== 'string') {
      res.status(400).json({ 
        error: "Please provide a valid name to search" 
      });
      return ;
    }

    const { users } = await getsearchUser(name.trim());
    res.status(200).json(users);
    return; 
  } catch (error) {
    console.error("Search error:", error);
    next(error);
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid } = req.params;
    const parsedUid = parseInt(uid, 10);

    if (isNaN(parsedUid)) {
      res.status(400).json({ error: "ENTER VALID ID" });
      return;
    }

    // Use page and pageSize query params
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 5;

    const { user, posts, totalPosts } = await getUserWithPosts(parsedUid, page, pageSize);

    res.status(200).json({
      ownerData: user,
      ownerPosts: posts,
      total: totalPosts,
      totalPages: Math.ceil(totalPosts / pageSize),
      currentPage: page,
      pageSize: pageSize,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { username, avatar, role } = req.body;

    if (username) {
      const usernameExists = await isUsernameTaken(username, userId);
      if (usernameExists) {
        res.status(409).json({ error: "Username already taken" });
        return;
      }
    }

    await updateUserInfo(userId, { username, avatar, role });

     res.status(200).json({ message: "Profile updated successfully" });
     return;
  } catch (error) {
    next(error);
  }
};
