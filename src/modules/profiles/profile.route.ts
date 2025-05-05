import { Router } from "express";
import { getUserProfile } from "./profile.controller";

const router = Router();

router.get("/:uid", getUserProfile);

export default router;
