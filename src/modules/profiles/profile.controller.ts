import { Request, Response, NextFunction } from "express";
import {
  getUserWithPosts,
  updateUserInfo,
  isUsernameTaken,
} from "./profile.service";

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
