"use strict";
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
exports.getComments = exports.addComment = exports.unlikePost = exports.likePost = exports.deleteComment = exports.updatePostService = exports.deletePostService = exports.createPostService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createPostService = (userId, body, files) => __awaiter(void 0, void 0, void 0, function* () {
    if (!body || body.trim().length === 0) {
        throw new Error("Body field is required");
    }
    const fileUrls = Array.isArray(files) && files.length > 0
        ? files.map((file) => file.path)
        : [];
    const userResult = yield db_1.default.query("SELECT username, avatar, uid FROM users WHERE id = $1", [userId]);
    if (userResult.rows.length === 0) {
        throw new Error("User not found");
    }
    const ownerData = userResult.rows[0];
    const insertResult = yield db_1.default.query("INSERT INTO posts (user_id, body, files) VALUES ($1, $2, $3) RETURNING id, user_id, body, files, created_at, updated_at", [userId, body, fileUrls]);
    const newPost = insertResult.rows[0];
    return {
        message: "Post created successfully",
        ownerData,
        newPost,
    };
});
exports.createPostService = createPostService;
const deletePostService = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const postResult = yield db_1.default.query("SELECT user_id FROM posts WHERE id = $1", [postId]);
    if (postResult.rows.length === 0) {
        return {
            status: 404,
            data: { error: "Post not found" },
        };
    }
    const post = postResult.rows[0];
    if (post.user_id !== userId) {
        return {
            status: 403,
            data: { error: "Not authorized to delete this post" },
        };
    }
    yield db_1.default.query("DELETE FROM posts WHERE id = $1", [postId]);
    return {
        status: 200,
        data: { message: "Post deleted successfully" },
    };
});
exports.deletePostService = deletePostService;
const updatePostService = (userId, postId, body, files) => __awaiter(void 0, void 0, void 0, function* () {
    const postResult = yield db_1.default.query("SELECT * FROM posts WHERE id = $1", [postId]);
    if (postResult.rows.length === 0) {
        return {
            status: 404,
            data: { error: "Post not found" },
        };
    }
    const post = postResult.rows[0];
    if (post.user_id !== userId) {
        return {
            status: 403,
            data: { error: "Not authorized to edit this post" },
        };
    }
    const fileUrls = Array.isArray(files) && files.length > 0
        ? files.map((file) => file.path)
        : post.files; // Keep existing files if no new files uploaded
    const updatedPost = yield db_1.default.query("UPDATE posts SET body = $1, files = $2, updated_at = NOW() WHERE id = $3 RETURNING id, user_id, body, files, created_at, updated_at", [body || post.body, fileUrls, postId]);
    return {
        status: 200,
        data: {
            message: "Post updated successfully",
            updatedPost: updatedPost.rows[0],
        },
    };
});
exports.updatePostService = updatePostService;
const deleteComment = (userId, postId, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if comment exists and belongs to user OR user owns the post
    const commentCheck = yield db_1.default.query(`SELECT c.user_id, p.user_id as post_owner_id
     FROM comments c
     JOIN posts p ON c.post_id = p.id
     WHERE c.id = $1 AND c.post_id = $2`, [commentId, postId]);
    if (commentCheck.rows.length === 0) {
        throw new Error("Comment not found");
    }
    const { user_id: commentOwnerId, post_owner_id: postOwnerId } = commentCheck.rows[0];
    // Allow deletion if:
    // 1. User is the comment owner, OR
    // 2. User is the post owner
    if (userId !== commentOwnerId && userId !== postOwnerId) {
        throw new Error("Not authorized to delete this comment");
    }
    yield db_1.default.query("DELETE FROM comments WHERE id = $1", [commentId]);
});
exports.deleteComment = deleteComment;
const likePost = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query("INSERT INTO likes (user_id, post_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [userId, postId]);
});
exports.likePost = likePost;
const unlikePost = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query("DELETE FROM likes WHERE user_id = $1 AND post_id = $2", [userId, postId]);
});
exports.unlikePost = unlikePost;
const addComment = (userId, postId, content) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *", [userId, postId, content]);
    return result.rows[0];
});
exports.addComment = addComment;
const getComments = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`SELECT c.*, u.username, u.avatar 
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.post_id = $1
     ORDER BY c.created_at DESC`, [postId]);
    return result.rows;
});
exports.getComments = getComments;
