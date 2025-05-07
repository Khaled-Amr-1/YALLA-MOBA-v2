import { Router } from "express";
import { createPost, deletePost } from "./post.controller";
import { upload } from "../../utils/cloudinary"; 
import { updatePost } from "./post.controller";

const router = Router();

router.post("/posts", upload.array("files", 10), createPost);
router.delete("/posts/:id", deletePost);
router.patch("/posts/:id", upload.array("files", 10), updatePost);

export default router;


