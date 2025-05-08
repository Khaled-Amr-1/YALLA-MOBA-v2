import express from "express";
import { registerUser, loginUser } from "./user.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { registerSchema, loginSchema } from "./user.schema";
import { authenticateToken } from "../../middlewares/authenticateToken";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "./user.controller";

const router = express.Router();

router.post("/register", validateSchema(registerSchema), registerUser);
router.post("/login", validateSchema(loginSchema), loginUser);

router.post("/:id/follow", authenticateToken, followUser);
router.delete("/:id/follow", authenticateToken, unfollowUser);
router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);

export default router;
