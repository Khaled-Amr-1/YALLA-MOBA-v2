"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedPosts = exports.getHomePosts = exports.getComments = exports.addComment = exports.unlikePost = exports.likePost = exports.deleteComment = exports.updatePost = exports.deletePost = exports.createPost = void 0;
const postService = __importStar(require("./post.service"));
const post_service_1 = require("./post.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        const { body } = req.body;
        const files = req.files;
        const result = yield postService.createPostService(userId, body, files);
        res.status(201).json(result);
    }
    catch (error) {
        console.error("Create Post Error:", error);
        res.status(500).json({ error: "Internal server error: " + error.message });
    }
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    //   if (!token) return res.status(401).json({ error: "No token provided" });
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        const postId = parseInt(req.params.id);
        const result = yield postService.deletePostService(userId, postId);
        res.status(result.status).json(result.data);
    }
    catch (error) {
        console.error("Delete Post Error:", error);
        res.status(500).json({ error: "Internal server error: " + error.message });
    }
});
exports.deletePost = deletePost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        const postId = parseInt(req.params.id);
        const textBody = req.body.body;
        const files = req.files;
        const result = yield postService.updatePostService(userId, postId, textBody, files);
        res.status(result.status).json(result.data);
        return;
    }
    catch (error) {
        console.error("Update Post Error:", error);
        res.status(500).json({ error: "Internal server error: " + error.message });
        return;
    }
});
exports.updatePost = updatePost;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    //   if (!token) return res.status(401).json({ error: "No token provided" });
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    const { postId, commentId } = req.params;
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    try {
        yield postService.deleteComment(+userId, +postId, +commentId);
        res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteComment = deleteComment;
// src/modules/posts/post.controller.ts
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    const { id: postId } = req.params;
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    try {
        yield postService.likePost(userId, +postId);
        res.status(200).json({ message: "Post liked successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to like post" });
    }
});
exports.likePost = likePost;
const unlikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    const { id: postId } = req.params;
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    try {
        yield postService.unlikePost(userId, +postId);
        res.status(200).json({ message: "Post unliked successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to unlike post" });
    }
});
exports.unlikePost = unlikePost;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    const { id: postId } = req.params;
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    const { content } = req.body;
    try {
        const comment = yield postService.addComment(userId, +postId, content);
        res.status(201).json(comment);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add comment" });
    }
});
exports.addComment = addComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    const { id: postId } = req.params;
    try {
        const comments = yield postService.getComments(+postId);
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});
exports.getComments = getComments;
const getHomePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, post_service_1.getHomePostsService)();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getHomePosts = getHomePosts;
const getFeedPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        const posts = yield (0, post_service_1.getFeedPostsService)(userId);
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getFeedPosts = getFeedPosts;
