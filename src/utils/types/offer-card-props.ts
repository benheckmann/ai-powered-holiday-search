import { Offer } from "@prisma/client";

export interface OfferCardProps {
  isLoading: boolean;
  key: number;
  offer: Offer;
}
