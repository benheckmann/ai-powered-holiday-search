interface OfferQuery {
  offerid?: number;
  hotelid?: number;
  outbounddeparturedatetime?: Date;
  inbounddeparturedatetime?: Date;
  countadults?: number;
  countchildren?: number;
  price?: number;
  inbounddepartureairport?: string;
  outboundarrivalairport?: string;
  inboundarrivaldatetime?: Date;
  outbounddepartureairport?: string;
  inboundarrivalairport?: string;
  outboundarrivaldatetime?: Date;
  mealtype?: string;
  oceanview?: string;
  roomtype?: string;
}
