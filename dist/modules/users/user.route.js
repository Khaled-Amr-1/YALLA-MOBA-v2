"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateSchema_1 = require("../../middlewares/validateSchema");
const user_schema_1 = require("./user.schema");
const authenticateToken_1 = require("../../middlewares/authenticateToken");
const user_controller_2 = require("./user.controller");
const router = express_1.default.Router();
router.post("/register", (0, validateSchema_1.validateSchema)(user_schema_1.registerSchema), user_controller_1.registerUser);
router.post("/login", (0, validateSchema_1.validateSchema)(user_schema_1.loginSchema), user_controller_1.loginUser);
router.post("/:id/follow", authenticateToken_1.authenticateToken, user_controller_2.followUser);
router.delete("/:id/follow", authenticateToken_1.authenticateToken, user_controller_2.unfollowUser);
router.get("/:id/followers", user_controller_2.getFollowers);
router.get("/:id/following", user_controller_2.getFollowing);
exports.default = router;
