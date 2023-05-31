import type { Query } from "~/utils/types/query";

export interface LLMJsonExplanation {
  chatResponse: string;
  selectedDestination: string;
  filters: {
    departureAirport: string;
    destinationAirport: string;
    departureDate: string;
    returnDate: string;
    countAdults: string;
    countChildren: string;
  };
}

export interface LLMJson {
  chatResponse: string;
  selectedDestination: string;
  filters: {
    departureAirport: string;
    destinationAirport: string;
    departureDate: string;
    returnDate: string;
    countAdults: number;
    countChildren: number;
  };
}

const hasLLMJsonAttributes = (json: Partial<LLMJson>): json is LLMJson =>
  "chatResponse" in json &&
  "selectedDestination" in json &&
  "filters" in json &&
  "departureAirport" in (json.filters ?? {}) &&
  "destinationAirport" in (json.filters ?? {}) &&
  "departureDate" in (json.filters ?? {}) &&
  "returnDate" in (json.filters ?? {}) &&
  "countAdults" in (json.filters ?? {}) &&
  "countChildren" in (json.filters ?? {});

export const isLLMJson = (content: string) => {
  try {
    const parsedJSON: Partial<LLMJson> = JSON.parse(content) as Partial<LLMJson>;
    if (hasLLMJsonAttributes(parsedJSON)) return true;
  } catch (err) {}
  console.log("isLLMJson FAIL", content, new Date().toLocaleTimeString());
  return false;
};

export const parseFilters = (content: LLMJson) => {
  const llmFilters: Partial<LLMJson["filters"]> = content.filters;
  const queryFilters: Query["filters"] = {
    departureAirport: (llmFilters.departureAirport ?? "").toUpperCase(),
    destinationAirport: (llmFilters.destinationAirport ?? "").toUpperCase(),
    departureDate: new Date(llmFilters.departureDate ?? "2023"),
    returnDate: new Date(llmFilters.returnDate ?? "2023"),
    countAdults: llmFilters.countAdults ?? 0,
    countChildren: llmFilters.countChildren ?? 0,
  };
  return queryFilters;
};

export const errorResponse: LLMJson = {
  chatResponse:
    "Tut mir leid, etwas ist schief gelaufen. Bitte versuche es noch einmal oder leere den Chat.",
  selectedDestination: "",
  filters: {
    departureAirport: "",
    destinationAirport: "",
    departureDate: "",
    returnDate: "",
    countAdults: 0,
    countChildren: 0,
  },
};
