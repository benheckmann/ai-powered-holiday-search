import { z } from "zod";

export const ChatMessage = z.object({
  role: z.string(),
  content: z.string(),
});

export const ChatHistory = z.array(ChatMessage);
