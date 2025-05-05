import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtPayload {
  userId: number;
  UID: string;
  // زود الحقول اللي انت بتحطها في الـ token لو في أكتر
}

// وسّع نوع Request عشان تضيف عليه user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    console.error("No token provided");
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
