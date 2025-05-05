import { Request, Response, NextFunction } from "express";
import { getUserWithPosts } from "./profile.service";

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const parsedUid = parseInt(uid, 10);

    if (isNaN(parsedUid)) {
      res.status(400).json({ error: "ENTER VALID ID" });
      return;
    }

    const { user, posts } = await getUserWithPosts(parsedUid);

    res.status(200).json({ ownerData: user, ownerPosts: posts });
  } catch (error) {
    next(error);
  }
};
