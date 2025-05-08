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
exports.getFollowing = exports.getFollowers = exports.unfollowUser = exports.followUser = exports.createUser = exports.isEmailExists = exports.findUserByEmailOrUsername = void 0;
const db_1 = __importDefault(require("../../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const findUserByEmailOrUsername = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT * FROM users WHERE email = $1 OR username = $1", [identifier]);
    return result.rows[0];
});
exports.findUserByEmailOrUsername = findUserByEmailOrUsername;
const isEmailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);
    return result.rows.length > 0;
});
exports.isEmailExists = isEmailExists;
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, email, password, gender, role, avatar, }) {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const result = yield db_1.default.query(`INSERT INTO users (username, email, password, gender, role, avatar)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, username, email, gender, role, avatar, uid, mobacoin, popularity`, [username, email, hashedPassword, gender, role, avatar]);
    return result.rows[0];
});
exports.createUser = createUser;
const followUser = (followerId, followingId) => __awaiter(void 0, void 0, void 0, function* () {
    if (followerId === followingId)
        throw new Error("Cannot follow yourself");
    yield db_1.default.query(`INSERT INTO follows (follower_id, following_id) 
     VALUES ($1, $2) 
     ON CONFLICT DO NOTHING`, [followerId, followingId]);
});
exports.followUser = followUser;
const unfollowUser = (followerId, followingId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query(`DELETE FROM follows 
     WHERE follower_id = $1 AND following_id = $2`, [followerId, followingId]);
});
exports.unfollowUser = unfollowUser;
const getFollowers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`SELECT u.id, u.username, u.avatar 
     FROM follows f
     JOIN users u ON f.follower_id = u.id
     WHERE f.following_id = $1`, [userId]);
    return result.rows;
});
exports.getFollowers = getFollowers;
const getFollowing = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`SELECT u.id, u.username, u.avatar 
     FROM follows f
     JOIN users u ON f.following_id = u.id
     WHERE f.follower_id = $1`, [userId]);
    return result.rows;
});
exports.getFollowing = getFollowing;
