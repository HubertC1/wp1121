import { z } from "zod";

export const updateDocSchema = z.object({
  title: z.string().optional(),
  content: z.string().array().optional(),
  sender: z.string().array().optional(),
});
