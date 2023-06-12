import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ZodQuery, ZodOfferWithHotel } from "~/utils/types/db-query";
import { prisma } from "~/server/db";
import { Hotel, Offer } from "@prisma/client";

const PAGE_SIZE = 24;

interface WhereClause {
  outbounddepartureairport?: string;
  outboundarrivalairport?: string;
  outbounddeparturedatetime?: { gte: Date };
  inboundarrivaldatetime?: { lte: Date };
  countadults?: number;
  countchildren?: number;
}

export const dbRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ filters: ZodQuery, pageNumber: z.number() }))
    .output(z.array(ZodOfferWithHotel))
    .query(async ({ input }) => {
      const { filters, pageNumber } = input;
      /**
       * Note: I needed to use a raw query here to work around a prisma bug.
       * Of course, this is no production code as it might be volnurable to sql injection attacks.
       */
      const sqlClause = `SELECT * 
      FROM newoffers 
      WHERE outbounddeparturedatetime >= "${filters.departureDate.toISOString()}" 
      AND inboundarrivaldatetime <= "${filters.returnDate.toISOString()}" 
      AND outbounddepartureairport = "${filters.departureAirport}" 
      AND outboundarrivalairport = "${filters.destinationAirport}" 
      AND countadults = ${filters.countAdults} 
      AND countchildren = ${filters.countChildren} 
      LIMIT ${PAGE_SIZE} OFFSET ${PAGE_SIZE * pageNumber}`;
      console.log("search", sqlClause, new Date().toLocaleTimeString());
      const offers = await prisma.$queryRawUnsafe<Offer[]>(sqlClause);
      // workaround
      const hotelIds = [...new Set(offers.map((offer) => offer.hotelid))];
      const hotels = await prisma.hotel.findMany({
        where: {
          hotelid: {
            in: hotelIds,
          },
        },
      });
      const hotelsById = Object.fromEntries(hotels.map((hotel) => [hotel.hotelid, hotel]));
      const offersWithHotels = offers.map((offer) => ({
        ...offer,
        Hotel: hotelsById[offer.hotelid]!,
      }));
      console.log("search done", offers.length, new Date().toLocaleTimeString());
      return offersWithHotels;
    }),
});
