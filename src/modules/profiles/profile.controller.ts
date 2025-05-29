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
    // Change from req.body to req.query since this is a search operation
    const { name } = req.query;

    if (!name || typeof name !== 'string') {
      res.status(400).json({ error: "Invalid search query" });
      return;
    }

    const users = await getsearchUser(name);
    res.status(200).json({ users });
  } catch (error) {
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

    const { user, posts } = await getUserWithPosts(parsedUid);

    res.status(200).json({ ownerData: user, ownerPosts: posts });
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
