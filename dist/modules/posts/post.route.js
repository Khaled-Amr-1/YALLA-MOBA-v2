"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const cloudinary_1 = require("../../utils/cloudinary");
const post_controller_2 = require("./post.controller");
const authenticateToken_1 = require("../../middlewares/authenticateToken");
const post_controller_3 = require("./post.controller");
const post_controller_4 = require("./post.controller");
const post_controller_5 = require("./post.controller");
const post_controller_6 = require("./post.controller");
const post_controller_7 = require("./post.controller");
const post_controller_8 = require("./post.controller");
const router = (0, express_1.Router)();
router.post("/", authenticateToken_1.authenticateToken, cloudinary_1.upload.array("files", 10), post_controller_1.createPost);
router.delete("/:id", authenticateToken_1.authenticateToken, post_controller_1.deletePost);
// router.patch("/posts/:id", upload.array("files", 10), updatePost);
router.patch("/:id", authenticateToken_1.authenticateToken, cloudinary_1.upload.array("files", 10), post_controller_2.updatePost);
router.post("/:id/like", authenticateToken_1.authenticateToken, post_controller_3.likePost);
router.delete("/:id/like", authenticateToken_1.authenticateToken, post_controller_3.unlikePost);
// *************************************************
router.post("/:id/comments", authenticateToken_1.authenticateToken, post_controller_5.addComment);
router.get("/:id/comments", authenticateToken_1.authenticateToken, post_controller_4.getComments);
router.delete("/:postId/comments/:commentId", authenticateToken_1.authenticateToken, post_controller_6.deleteComment);
// Public endpoint (no auth required)
router.get("/home", post_controller_7.getHomePosts);
// Private endpoint (requires auth)
router.get("/feed", authenticateToken_1.authenticateToken, post_controller_8.getFeedPosts);
exports.default = router;
