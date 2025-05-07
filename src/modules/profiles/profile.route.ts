import { Router } from "express";
import { getUserProfile, updateUserProfile } from "./profile.controller";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { validateSchema } from "../../middlewares/validateSchema";
import { updateProfileSchema } from "./profile.schema"; // 👈 استيراد

const router = Router();

router.get("/:uid", authenticateToken, getUserProfile); // still supports public profile viewing
router.patch("/", authenticateToken, validateSchema(updateProfileSchema), updateUserProfile); // ✅ validation هنا

export default router;
