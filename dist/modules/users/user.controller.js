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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowing = exports.getFollowers = exports.unfollowUser = exports.followUser = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_service_1 = require("./user.service");
const userService = __importStar(require("./user.service"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { repassword } = _a, userData = __rest(_a, ["repassword"]);
        if (yield (0, user_service_1.isEmailExists)(userData.email)) {
            res.status(400).json({ error: "Email already exists" });
            return;
        }
        const user = yield (0, user_service_1.createUser)(userData);
        const token = jsonwebtoken_1.default.sign({ userId: user.id, UID: user.uid }, JWT_SECRET, {
            expiresIn: "3000h",
        });
        res.status(201).json({
            token,
            user: {
                username: user.username,
                email: user.email,
                gender: user.gender,
                role: user.role,
                avatar: user.avatar,
                UID: user.uid,
                popularity: user.popularity,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identifier, password } = req.body;
        const user = yield (0, user_service_1.findUserByEmailOrUsername)(identifier);
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            res.status(401).json({ error: "Invalid email, username, or password." });
            return;
        }
        const userToken = jsonwebtoken_1.default.sign({ userId: user.id, UID: user.uid }, JWT_SECRET, {
            expiresIn: "3000h",
        });
        res.json({
            userToken,
            userData: {
                username: user.username,
                email: user.email,
                gender: user.gender,
                role: user.role,
                avatar: user.avatar,
                UID: user.uid,
                popularity: user.popularity,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    const { id: followingId } = req.params;
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const followerId = decoded.userId;
    try {
        yield userService.followUser(+followerId, +followingId);
        res.status(200).json({ message: "Followed successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.followUser = followUser;
const unfollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    const { id: followingId } = req.params;
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const followerId = decoded.userId;
    try {
        yield userService.unfollowUser(+followerId, +followingId);
        res.status(200).json({ message: "Unfollowed successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.unfollowUser = unfollowUser;
const getFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.params;
    try {
        const followers = yield userService.getFollowers(+userId);
        res.status(200).json(followers);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getFollowers = getFollowers;
const getFollowing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.params;
    try {
        const following = yield userService.getFollowing(+userId);
        res.status(200).json(following);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getFollowing = getFollowing;
