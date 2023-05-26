import { z } from "zod";

export const ZodQuery = z.object({
  departureAirport: z.string(),
  destinationAirport: z.string(),
  departureDate: z.date(),
  returnDate: z.date(),
  countAdults: z.number(),
  countChildren: z.number(),
});

export const ZodOffer = z.object({
  offerid: z.number().int(),
  hotelid: z.number().int(),
  outbounddeparturedatetime: z.date(),
  inbounddeparturedatetime: z.date(),
  countadults: z.number().int(),
  countchildren: z.number().int(),
  price: z.number(),
  inbounddepartureairport: z.string(),
  outboundarrivalairport: z.string(),
  inboundarrivaldatetime: z.date(),
  outbounddepartureairport: z.string(),
  inboundarrivalairport: z.string(),
  outboundarrivaldatetime: z.date(),
  mealtype: z.string(),
  oceanview: z.string(),
  roomtype: z.string(),
});

export const ZodHotel = z.object({
  hotelid: z.number().int(),
  hotelname: z.string(),
  hotelstars: z.number(), // alternative: z.instanceof(Prisma.Decimal);
});

export const ZodOfferWithHotel = ZodOffer.merge(
  z.object({
    Hotel: ZodHotel,
  })
);
