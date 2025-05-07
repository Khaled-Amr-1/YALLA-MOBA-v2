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
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_service_1 = require("./user.service");
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
