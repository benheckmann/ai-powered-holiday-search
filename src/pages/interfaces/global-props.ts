import { Dispatch, SetStateAction } from "react";
import { Pages } from "./page-name-enum";
import { QueryFilters } from "./query-filters";
import { Offer } from "@prisma/client";
import { Message } from "./message";
import { UseTRPCMutationResult, UseTRPCQueryResult } from "@trpc/react-query/shared";

export interface GlobalProps {
  // displayed data
  currentPage: Pages;
  setCurrentPage: Dispatch<SetStateAction<Pages>>;
  query: QueryFilters;
  setQuery: Dispatch<SetStateAction<QueryFilters>>;
  cachedOffers: Offer[];
  setCachedOffers: Dispatch<SetStateAction<Offer[]>>;
  // api
  chatHistory: UseTRPCQueryResult<any, any>;
  requestCompletion: UseTRPCMutationResult<any, any, any, any>;
  addUserMessage: UseTRPCMutationResult<any, any, any, any>;
  clearChatHistory: UseTRPCMutationResult<any, any, any, any>;
}
