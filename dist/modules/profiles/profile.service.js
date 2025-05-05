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
exports.getUserWithPosts = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getUserWithPosts = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const userResult = yield db_1.default.query(`SELECT id, username, gender, role, avatar, uid, popularity FROM users WHERE uid = $1`, [uid]);
    if (userResult.rows.length === 0) {
        throw { status: 404, message: "User not found" };
    }
    const user = userResult.rows[0];
    const postsResult = yield db_1.default.query(`SELECT id, body, files, created_at, updated_at FROM posts WHERE user_id = $1 ORDER BY created_at DESC`, [user.id]);
    delete user.id;
    return { user, posts: postsResult.rows };
});
exports.getUserWithPosts = getUserWithPosts;
