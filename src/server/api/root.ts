import { createTRPCRouter } from "~/server/api/trpc";
import { llmRouter } from "~/server/api/routers/llm-router";
import { dbRouter } from "./routers/db-router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  llm: llmRouter,
  db: dbRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
