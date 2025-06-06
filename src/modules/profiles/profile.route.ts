import { Router } from "express";
import { getUserProfile, updateUserProfile } from "./profile.controller";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { validateSchema } from "../../middlewares/validateSchema";
import { updateProfileSchema } from "./profile.schema"; // 👈 استيراد
import { searchUser } from "./profile.controller";

const router = Router();

router.get("/:uid", authenticateToken, getUserProfile); 
router.post("/search", authenticateToken, searchUser);

router.patch("/", authenticateToken, validateSchema(updateProfileSchema), updateUserProfile); // ✅ validation هنا

export default router;
