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
      const depDate = new Date(filters.departureDate);
      depDate.setUTCDate(depDate.getUTCDate() + 1);
      depDate.setUTCHours(0, 0, 0, 0);
      const depDateStart = depDate.toISOString();
      depDate.setUTCHours(23, 59, 59, 999);
      const depDateEnd = depDate.toISOString();
      const retDate = new Date(filters.returnDate);
      retDate.setUTCDate(retDate.getUTCDate() + 1);
      retDate.setUTCHours(0, 0, 0, 0);
      const retDateStart = retDate.toISOString();
      retDate.setUTCHours(23, 59, 59, 999);
      const retDateEnd = retDate.toISOString();
      // the ordering of the query matches the composite index which is based on the cardinality of the column value sets
      const sqlClause = `
      SELECT * 
      FROM newoffers 
      WHERE inboundarrivaldatetime >= "${retDateStart}" 
      AND inboundarrivaldatetime <= "${retDateEnd}" 
      AND outbounddeparturedatetime >= "${depDateStart}"
      AND outbounddeparturedatetime <= "${depDateEnd}"
      AND outbounddepartureairport = "${filters.departureAirport}" 
      AND countadults = ${filters.countAdults} 
      AND countchildren = ${filters.countChildren}
      AND outboundarrivalairport = "${filters.destinationAirport}" 
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
