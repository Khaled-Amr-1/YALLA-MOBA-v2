import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(6, "Username must be at least 6 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    repassword: z.string(),
    gender: z.string(),
    role: z.string(),
    avatar: z.string(),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords do not match",
    path: ["repassword"],
  });

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
