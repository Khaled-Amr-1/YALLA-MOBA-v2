import { Router } from "express";
import { createPost, deletePost } from "./post.controller";
import { upload } from "../../utils/cloudinary";
import { updatePost } from "./post.controller";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { likePost, unlikePost } from "./post.controller";
import { getComments } from "./post.controller";
import { addComment } from "./post.controller";
import { deleteComment } from "./post.controller";
import { getHomePosts } from "./post.controller";
import { getFeedPosts } from "./post.controller";

const router = Router();

router.post("/", authenticateToken, upload.array("files", 10), createPost);
router.delete("/:id", authenticateToken, deletePost);

// router.patch("/posts/:id", upload.array("files", 10), updatePost);
router.patch(
  "/:id",
  authenticateToken,
  upload.array("files", 10),
  updatePost
);
router.post("/:id/like", authenticateToken, likePost);
router.delete("/:id/like", authenticateToken, unlikePost);

// *************************************************
router.post("/:id/comments", authenticateToken, addComment);
router.get("/:id/comments", authenticateToken, getComments);
router.delete(
  "/:postId/comments/:commentId",
  authenticateToken,
  deleteComment
);

// Public endpoint (no auth required)
router.get("/home",authenticateToken, getHomePosts);

// Private endpoint (requires auth)
router.get("/feed", authenticateToken, getFeedPosts);

export default router;
