import express from "express";
import { registerUser, loginUser } from "./user.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { registerSchema, loginSchema } from "./user.schema";

const router = express.Router();

router.post("/register", validateSchema(registerSchema), registerUser);
router.post("/login", validateSchema(loginSchema), loginUser);

export default router;
