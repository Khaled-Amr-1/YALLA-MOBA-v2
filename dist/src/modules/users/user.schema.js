"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z
    .object({
    username: zod_1.z.string().min(6, "Username must be at least 6 characters"),
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    repassword: zod_1.z.string(),
    gender: zod_1.z.string(),
    role: zod_1.z.string(),
    avatar: zod_1.z.string(),
})
    .refine((data) => data.password === data.repassword, {
    message: "Passwords do not match",
    path: ["repassword"],
});
exports.loginSchema = zod_1.z.object({
    identifier: zod_1.z.string(),
    password: zod_1.z.string(),
});
