// profile.schema.ts
import { z } from "zod";

export const updateProfileSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters").optional(),
  avatar: z.string().url("Avatar must be a valid URL").optional(),
  role: z.string().optional(),
});
