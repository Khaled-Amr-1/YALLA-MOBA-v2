"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("./profile.controller");
const authenticateToken_1 = require("../../middlewares/authenticateToken");
const router = (0, express_1.Router)();
router.get("/:uid", authenticateToken_1.authenticateToken, profile_controller_1.getUserProfile);
exports.default = router;
