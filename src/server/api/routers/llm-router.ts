import { z } from "zod";
import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum as Role } from "openai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Message } from "~/utils/types/message";
import {
  JSON_CHECK_FAILED_ENGLISH,
  SYSTEM_MESSAGE_GERMAN,
  USER_MESSAGE_PREFIX_GERMAN,
} from "../llm/prompts";
import { ZodChatMessage } from "../../../utils/types/chat-history";
import { errorResponse, isLLMJson } from "~/utils/types/llm-json";

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

const addFirstMessagePrefix = (messages: Message[]) => {
  if (messages.length === 0) {
    return [];
  }
  const newFirstMessage = {
    role: Role.User,
    content: USER_MESSAGE_PREFIX_GERMAN + messages[0]!.content,
  };
  return [newFirstMessage, ...messages.slice(1)];
};

const checkLLMCompletion = async (sessionId: string, completionContent: string) => {
  const messages = [{ role: Role.User, content: JSON_CHECK_FAILED_ENGLISH + completionContent }]
  if (isLLMJson(completionContent)) return completionContent;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  const newCompletionContent = response.data.choices[0]!.message!.content;
  if (isLLMJson(newCompletionContent)) return newCompletionContent;
  return JSON.stringify(errorResponse);
};

const addLLMCompletion = async (sessionId: string) => {
  const messages = [
    { role: Role.System, content: SYSTEM_MESSAGE_GERMAN },
    ...messagesToOpenAIFormat(addFirstMessagePrefix(sessions[sessionId] ?? [])),
  ];
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  let completionContent = response.data.choices[0]!.message!.content;
  completionContent = await checkLLMCompletion(sessionId, completionContent);
  console.log("addLLMCompletion done", completionContent);
  sessions[sessionId]!.push({ role: Role.System, content: completionContent });
};

export const llmRouter = createTRPCRouter({
  getChatHistory: publicProcedure
    .input(z.string())
    .output(z.array(ZodChatMessage))
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
