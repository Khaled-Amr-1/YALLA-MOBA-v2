import { Router } from "express";
import { createPost, deletePost } from "./post.controller";
import { upload } from "../../utils/cloudinary"; // سننشئه بعد قليل

const router = Router();

router.post("/posts", upload.array("files", 10), createPost);
router.delete("/posts/:id", deletePost);

export default router;
