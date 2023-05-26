import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ZodQuery, ZodOffer, ZodOfferWithHotel } from "../api-types/db-query";
import { prisma } from "~/server/db";

const PAGE_SIZE = 36;

export const dbRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ filters: ZodQuery, pageNumber: z.number() }))
    .output(z.array(ZodOfferWithHotel))
    .query(async ({ input }) => {
      console.log("search", input, new Date().toLocaleTimeString());
      const { filters, pageNumber } = input;
      const offers = await prisma.offer.findMany({
        take: PAGE_SIZE,
        skip: PAGE_SIZE * pageNumber,
        where: {
          outbounddepartureairport: filters.departureAirport,
          outboundarrivalairport: filters.destinationAirport,
          outbounddeparturedatetime: {
            gte: filters.departureDate,
          },
          inboundarrivaldatetime: {
            lte: filters.returnDate,
          },
          countadults: filters.countAdults,
          countchildren: filters.countChildren,
        },
        include: {
          Hotel: true,
        },
      });
      return offers;
    }),
});
