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
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, repassword, gender, role, avatar } = req.body;
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            res.status(400).json({ error: "Invalid email format" });
        if (!username || !email || !password || !gender || !role || !avatar) {
            res.status(400).json({ error: "All fields are required" });
        }
        if (username.length < 6)
            res
                .status(400)
                .json({ error: "Username must be at least 6 characters" });
        if (password.length < 8)
            res
                .status(400)
                .json({ error: "Password must be at least 8 characters" });
        if (password !== repassword)
            res.status(400).json({ error: "Passwords do not match" });
        const emailCheck = yield db_1.default.query("SELECT * FROM users WHERE email = $1", [email]);
        if (emailCheck.rows.length > 0) {
            res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const result = yield db_1.default.query(`INSERT INTO users (username, email, password, gender, role, avatar)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, username, email, gender, role, avatar, uid, mobacoin, popularity`, [username, email, hashedPassword, gender, role, avatar]);
        const user = result.rows[0];
        const UserToken = jsonwebtoken_1.default.sign({ userId: user.id, UID: user.uid }, JWT_SECRET, {
            expiresIn: "3000h",
        });
        res.status(201).json({
            UserToken,
            UserData: {
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
    const { identifier, password } = req.body;
    try {
        if (!identifier || !password) {
            res
                .status(400)
                .json({ error: "(email or username) and password are required" });
        }
        const result = yield db_1.default.query(`SELECT id, username, email, password, gender, role, avatar, uid, mobacoin, popularity 
       FROM users 
       WHERE email = $1 OR username = $1`, [identifier]);
        if (result.rows.length === 0) {
            res
                .status(401)
                .json({ error: "Wrong email, username, or password!" });
        }
        const user = result.rows[0];
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            res
                .status(401)
                .json({ error: "Wrong email, username, or password!" });
        }
        const UserToken = jsonwebtoken_1.default.sign({ userId: user.id, UID: user.uid }, JWT_SECRET, {
            expiresIn: "3000h",
        });
        res.json({
            UserToken,
            UserData: {
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
