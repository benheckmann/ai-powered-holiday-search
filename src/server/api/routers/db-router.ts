import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { HolidayQuery, Offer } from "../zod-types/db-query";

export const dbRouter = createTRPCRouter({
  search: publicProcedure
    .input(HolidayQuery)
    .output(z.array(Offer))
    .query(({ input }) => {
      console.log("search", input, new Date().toLocaleTimeString());
      // todo: implement
    }),
});
