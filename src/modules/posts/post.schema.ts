import { z } from "zod";

export const updatePostSchema = z.object({
  body: z
    .object({
      body: z.string().min(1, "Post body is required").optional(), // body is optional but must be non-empty if provided
    })
    .strict(),
  params: z.object({
    id: z.string().regex(/^\d+$/, "Post ID must be a number"),
  }),
});
