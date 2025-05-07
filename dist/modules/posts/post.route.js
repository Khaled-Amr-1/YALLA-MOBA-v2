"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const cloudinary_1 = require("../../utils/cloudinary"); // سننشئه بعد قليل
const router = (0, express_1.Router)();
router.post("/posts", cloudinary_1.upload.array("files", 10), post_controller_1.createPost);
router.delete("/posts/:id", post_controller_1.deletePost);
exports.default = router;
