import { z } from "zod";

export const HolidayQuery = z.object({
  departureAirport: z.string(),
  destinationAirport: z.string(),
  departureDate: z.date(),
  returnDate: z.date(),
  countAdults: z.number(),
  countChildren: z.number(),
});

export const Offer = z.object({
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

export const Hotel = z.object({
  hotelid: z.number().int(),
  hotelname: z.string(),
  hotelstars: z.number(),
});
