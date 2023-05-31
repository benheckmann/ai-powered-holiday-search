import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ZodQuery, ZodOfferWithHotel } from "~/utils/types/db-query";
import { prisma } from "~/server/db";

const PAGE_SIZE = 12;

export const dbRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ filters: ZodQuery, pageNumber: z.number() }))
    .output(z.array(ZodOfferWithHotel))
    .query(async ({ input }) => {
      const { filters, pageNumber } = input;
      console.log("search", input, new Date().toLocaleTimeString());
      const where: any = {};
      if (filters.departureAirport) {
        where.outbounddepartureairport = filters.departureAirport;
      }
      if (filters.destinationAirport) {
        where.outboundarrivalairport = filters.destinationAirport;
      }
      if (filters.departureDate) {
        where.outbounddeparturedatetime = { gte: filters.departureDate };
      }
      if (filters.returnDate) {
        where.inboundarrivaldatetime = { lte: filters.returnDate };
      }
      if (filters.countAdults) {
        where.countadults = filters.countAdults;
      }
      if (filters.countChildren) {
        where.countchildren = filters.countChildren;
      }
      const offers = await prisma.offer.findMany({
        take: PAGE_SIZE,
        skip: PAGE_SIZE * pageNumber,
        where,
        include: {
          Hotel: true,
        },
      });
      console.log("search done", offers.length, new Date().toLocaleTimeString());
      return offers;
    }),
});
