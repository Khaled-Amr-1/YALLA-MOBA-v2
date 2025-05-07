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
exports.deletePostService = exports.createPostService = void 0;
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
