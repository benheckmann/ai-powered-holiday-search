import { type NextPage } from "next";
import Head from "next/head";
import { v4 } from "uuid";

import { Pages } from "./interfaces/page-name-enum";
import { useEffect, useState } from "react";
import { ResultsPage } from "./results-page";
import { SearchPage } from "./search-page";
import { GlobalProps } from "./interfaces/global-props";
import { mockOffers } from "../../public/mock-data/mock-offers";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(Pages.SEARCH);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState({
    departureAirport: "",
    destinationAirport: "",
    departureDate: new Date(2023, 8, 1),
    returnDate: new Date(2023, 8, 7),
    countAdults: "",
    countChildren: "",
  });
  const [cachedOffers, setCachedOffers] = useState(mockOffers);
  const [sessionId, setSessionId] = useState<string>("UNINITIALIZED_SESSION_ID");

  // api
  const chatHistory = api.llm.getChatHistory.useQuery(sessionId);
  const addUserMessage = api.llm.addUserMessage.useMutation();
  const clearChatHistory = api.llm.clearChatHistory.useMutation();

  useEffect(() => {
    if (!localStorage.getItem("sessionId")) {
      localStorage.setItem("sessionId", v4());
    }
    setSessionId(localStorage.getItem("sessionId")!);
  }, []);

  const renderPage = () => {
    const props: GlobalProps = {
      currentPage,
      setCurrentPage,
      isLoading,
      setIsLoading,
      query: query,
      setQuery: setQuery,
      cachedOffers,
      setCachedOffers,
      chatHistory,
      addUserMessage,
      clearChatHistory,
    };
    switch (currentPage) {
      case Pages.SEARCH:
        return <SearchPage {...props} />;
      case Pages.RESULTS:
        return <ResultsPage {...props} />;
    }
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white">{renderPage()}</main>
    </>
  );
};

export default Home;
