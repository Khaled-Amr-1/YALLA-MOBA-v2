"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const validateSchema_1 = require("../middlewares/validateSchema");
const user_schema_1 = require("../validations/user.schema");
const router = express_1.default.Router();
router.post("/register", (0, validateSchema_1.validateSchema)(user_schema_1.registerSchema), user_controller_1.registerUser);
router.post("/login", (0, validateSchema_1.validateSchema)(user_schema_1.loginSchema), user_controller_1.loginUser);
exports.default = router;
