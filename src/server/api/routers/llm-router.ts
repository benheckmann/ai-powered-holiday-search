import { z } from "zod";
import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum as Role } from "openai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Message } from "~/pages/interfaces/message";
import { SYSTEM_MESSAGE_ENGLISH } from "../llm/prompts";
import { ChatHistory } from "../zod-types/chat-history";

const sessions: Record<string, Message[]> = {};
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const messagesToOpenAIFormat = (messages: Message[]) => {
  return messages.map((message) => ({
    role: message.role as Role,
    content: message.content,
  }));
};

const addLLMCompletion = async (sessionId: string) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: Role.System, content: SYSTEM_MESSAGE_ENGLISH },
      ...messagesToOpenAIFormat(sessions[sessionId] ?? []),
    ],
  });
  const chatCompletion = response.data.choices[0]!.message!;
  console.log("addLLMCompletion done", chatCompletion);
  sessions[sessionId]!.push({ role: Role.System, content: chatCompletion.content });
};

export const llmRouter = createTRPCRouter({
  getChatHistory: publicProcedure
    .input(z.string())
    .output(ChatHistory)
    .query(({ input }) => {
      console.log("getChatHistory", input, new Date().toLocaleTimeString());
      return sessions[input] ?? [];
    }),
  addUserMessage: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
        messageContent: z.string(),
      })
    )
    .mutation(({ input }) => {
      console.log("addUserMessage", input, new Date().toLocaleTimeString());
      const { sessionId, messageContent } = input;
      sessions[sessionId] = [
        ...(sessions[sessionId] ?? []),
        { role: Role.User, content: messageContent },
      ];
    }),
  requestCompletion: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const id = input;
    const messages = sessions[id] ?? [];
    if (messages.length > 0 && messages[messages.length - 1]!.role === Role.User) {
      console.log("requestCompletion", id, new Date().toLocaleTimeString());
      await addLLMCompletion(id);
    }
  }),
  clearChatHistory: publicProcedure.input(z.string()).mutation(({ input }) => {
    console.log("clearChatHistory", input, new Date().toLocaleTimeString());
    sessions[input] = [];
  }),
});
