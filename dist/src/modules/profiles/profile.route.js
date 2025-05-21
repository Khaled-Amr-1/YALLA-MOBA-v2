"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("./profile.controller");
const authenticateToken_1 = require("../../middlewares/authenticateToken");
const validateSchema_1 = require("../../middlewares/validateSchema");
const profile_schema_1 = require("./profile.schema"); // 👈 استيراد
const router = (0, express_1.Router)();
router.get("/:uid", authenticateToken_1.authenticateToken, profile_controller_1.getUserProfile); // still supports public profile viewing
router.patch("/", authenticateToken_1.authenticateToken, (0, validateSchema_1.validateSchema)(profile_schema_1.updateProfileSchema), profile_controller_1.updateUserProfile); // ✅ validation هنا
exports.default = router;
