import { Dispatch, SetStateAction } from "react";
import { Pages } from "./page-name-enum";
import { Query } from "./query";
import { UseTRPCMutationResult, UseTRPCQueryResult } from "@trpc/react-query/shared";
import { api } from "../api";

// api types for TS
const chatHistoryEndpoint = api.llm.getChatHistory.useQuery("sessionId");
const requestCompletionEndpoint = api.llm.requestCompletion.useMutation();
const addUserMessageEndpoint = api.llm.addUserMessage.useMutation();
const clearChatHistoryEndpoint = api.llm.clearChatHistory.useMutation();
const resultsEndpoint = api.db.search.useQuery({
  filters: {
    departureAirport: "",
    destinationAirport: "",
    departureDate: new Date(),
    returnDate: new Date(),
    countAdults: 0,
    countChildren: 0,
  },
  pageNumber: 0,
});
type ChatHistory = typeof chatHistoryEndpoint;
type RequestCompletion = typeof requestCompletionEndpoint;
type AddUserMessage = typeof addUserMessageEndpoint;
type ClearChatHistory = typeof clearChatHistoryEndpoint;
type Results = typeof resultsEndpoint;

export interface GlobalProps {
  // displayed data
  currentPage: Pages;
  setCurrentPage: Dispatch<SetStateAction<Pages>>;
  query: Query;
  setQuery: Dispatch<SetStateAction<Query>>;
  // api
  chatHistory: ChatHistory;
  results: Results;
  requestCompletion: RequestCompletion;
  addUserMessage: AddUserMessage;
  clearChatHistory: ClearChatHistory;
}
