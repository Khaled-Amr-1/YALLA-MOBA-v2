import { Router } from "express";
import { getUserProfile } from "./profile.controller";
import { authenticateToken } from "../../middlewares/authenticateToken";
const router = Router();

router.get("/:uid",authenticateToken, getUserProfile);

export default router;
