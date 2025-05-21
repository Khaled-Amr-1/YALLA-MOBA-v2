"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
// profile.schema.ts
const zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z.object({
    username: zod_1.z.string().min(6, "Username must be at least 6 characters").optional(),
    avatar: zod_1.z.string().url("Avatar must be a valid URL").optional(),
    role: zod_1.z.string().optional(),
});
