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

const hasLLMJsonAttributes = (json: any) =>
  "chatResponse" in json &&
  "selectedDestination" in json &&
  "filters" in json &&
  "departureAirport" in json.filters &&
  "destinationAirport" in json.filters &&
  "departureDate" in json.filters &&
  "returnDate" in json.filters &&
  "countAdults" in json.filters &&
  "countChildren" in json.filters;

export const isLLMJson = (content: string) => {
  try {
    const parsedJSON = JSON.parse(content);
    if (hasLLMJsonAttributes(parsedJSON)) return true;
  } catch (err) {}
  console.log("isLLMJson FAIL", content, new Date().toLocaleTimeString());
  return false;
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
  }