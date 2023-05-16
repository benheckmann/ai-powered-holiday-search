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
  initialLLMQuery: publicProcedure
    .input(z.object({ text: z.string().nullish() }))
    .query(async ({ input }) => {
      if (!input.text || !input.text.startsWith("QUERY: ")) {
        // hack to get around a tRPC bug which calls the endpoint on every keystroke
        // instead, manually adding 'QUERY: ' when submitting the form
        console.log("ignoring incomple request: ", input.text);
        return { role: "assistant", content: "" };
      }
      console.log("Calling OpenAI API with input:", input.text);
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_MESSAGE_ENGLISH },
          { role: "user", content: input.text },
        ],
      });
      console.log("OpenAI API response:", response);
      return response.data.choices[0]!.message!;
    }),
});
