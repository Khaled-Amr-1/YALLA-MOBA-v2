"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostSchema = void 0;
const zod_1 = require("zod");
exports.updatePostSchema = zod_1.z.object({
    body: zod_1.z.string().min(1, "Post body is required").optional(), // Flat structure
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^\d+$/, "Post ID must be a number"),
    }),
});
