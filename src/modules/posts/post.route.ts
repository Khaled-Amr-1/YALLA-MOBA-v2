import { Router } from "express";
import { createPost, deletePost } from "./post.controller";
import { upload } from "../../utils/cloudinary";
import { updatePost } from "./post.controller";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { likePost, unlikePost } from "./post.controller";
import { getComments } from "./post.controller";
import { addComment } from "./post.controller";
import { deleteComment } from "./post.controller";

const router = Router();

router.post("/posts", authenticateToken, upload.array("files", 10), createPost);
router.delete("/posts/:id", authenticateToken, deletePost);

// router.patch("/posts/:id", upload.array("files", 10), updatePost);
router.patch(
  "/posts/:id",
  authenticateToken,
  upload.array("files", 10),
  updatePost
);
router.post("/posts/:id/like", authenticateToken, likePost);
router.delete("/posts/:id/like", authenticateToken, unlikePost);

router.post("/posts/:id/comments", authenticateToken, addComment);
router.get("/posts/:id/comments", authenticateToken, getComments);
router.delete(
  "/posts/:postId/comments/:commentId",
  authenticateToken,
  deleteComment
);

export default router;
