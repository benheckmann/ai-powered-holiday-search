import { z } from "zod";
import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum as Role } from "openai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Message } from "~/pages/interfaces/message";
import { SYSTEM_MESSAGE_ENGLISH } from "../llm/prompts";
import { ChatHistory, ChatMessage } from "../zod-types/chat-history";

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

export const llmRouter = createTRPCRouter({
  llmChat: publicProcedure
    .input(ChatHistory)
    .output(ChatMessage)
    .query(async ({ input }) => {
      if (input.length === 0) {
        console.log("Empty chat history, returning empty response");
        return { role: "", content: "" };
      }
      console.log("Calling OpenAI API with chat history: ", input);
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: Role.System, content: SYSTEM_MESSAGE_ENGLISH },
          ...messagesToOpenAIFormat(input),
        ],
      });
      const chatCompletion = response.data.choices[0]!.message!;
      console.log("OpenAI API completion: ", chatCompletion);
      return chatCompletion;
    }),
});
