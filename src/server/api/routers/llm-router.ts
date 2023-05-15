import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Message } from "~/pages/interfaces/message";
import { SYSTEM_MESSAGE_ENGLISH } from "../llm/prompts";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const llmRouter = createTRPCRouter({
  searchBarInputToQuery: publicProcedure
    .input(z.object({ text: z.string().nullish() }))
    .mutation(async ({ input }) => {
      if (!input.text) {
        console.log("Empty input, returning empty response");
        return { role: "", content: "" };
      }
      console.log("Calling OpenAI API with input:", input.text);
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_MESSAGE_ENGLISH },
          { role: "user", content: input.text },
        ],
      });
      const message = response.data.choices[0]!.message!;
      return message;
    }),
});
