import { Dispatch, SetStateAction } from "react";
import { Pages } from "./page-name-enum";
import { QueryFilters } from "./query-filters";
import { Offer } from "@prisma/client";
import { Message } from "./message";

export interface GlobalProps {
  currentPage: Pages;
  setCurrentPage: Dispatch<SetStateAction<Pages>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  query: QueryFilters;
  setQuery: Dispatch<SetStateAction<QueryFilters>>;
  cachedOffers: Offer[];
  setCachedOffers: Dispatch<SetStateAction<Offer[]>>;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
}
