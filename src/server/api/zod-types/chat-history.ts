import { z } from "zod";

export const ZodChatMessage = z.object({
  role: z.string(),
  content: z.string(),
});
