import { type NextPage } from "next";
import Head from "next/head";
import { v4 } from "uuid";
import { ChatCompletionRequestMessageRoleEnum as Role } from "openai";

import { Pages } from "../utils/types/page-name-enum";
import { useEffect, useState } from "react";
import ResultsPage from "./results-page";
import SearchPage from "./search-page";
import { GlobalProps } from "../utils/types/global-props";
import { api } from "~/utils/api";
import { isLLMJson, parseFilters } from "~/utils/types/llm-json";
import DummyHeaderBar from "./components/DummyHeaderBar";
import DummyFooter from "./components/DummyFooter";

/* eslint-disable */

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(Pages.SEARCH);
  const [query, setQuery] = useState({
    filters: {
      departureAirport: "MUC",
      destinationAirport: "",
      departureDate: new Date(),
      returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      countAdults: 2,
      countChildren: 0,
    },
    pageNumber: 0,
  });
  // const [cachedOffers, setCachedOffers] = useState<(Offer & { Hotel: Hotel })[]>([]);
  const [sessionId, setSessionId] = useState("UNINITIALIZED_SESSION_ID");

  // initialize sessionId
  useEffect(() => {
    if (!localStorage.getItem("sessionId")) {
      localStorage.setItem("sessionId", v4());
    }
    setSessionId(localStorage.getItem("sessionId")!);
  }, []);

  // initialize api
  const chatHistory = api.llm.getChatHistory.useQuery(sessionId, {
    onSuccess: (data) => {
      if (data.length > 0) {
        const lastMessage = data[data.length - 1]!;
        if (lastMessage.role === Role.Assistant && isLLMJson(lastMessage.content)) {
          const newFilters = parseFilters(JSON.parse(lastMessage.content));
          setQuery({ filters: newFilters, pageNumber: 0 });
        }
      }
    },
  });
  const requestCompletion = api.llm.requestCompletion.useMutation({
    onSuccess: () => {
      console.log("requestCompletion success", new Date().toLocaleTimeString());
      chatHistory.refetch();
    },
  });
  const addUserMessage = api.llm.addUserMessage.useMutation({
    onSuccess: () => {
      console.log("addUserMessage success", new Date().toLocaleTimeString());
      chatHistory.refetch();
      requestCompletion.mutateAsync(sessionId);
    },
  });
  const clearChatHistory = api.llm.clearChatHistory.useMutation({
    onSuccess: () => {
      console.log("clearChatHistory success", new Date().toLocaleTimeString());
      chatHistory.refetch();
    },
  });
  const results = api.db.search.useQuery(query);

  const renderPage = () => {
    const props: GlobalProps = {
      currentPage,
      setCurrentPage,
      query,
      setQuery,
      chatHistory,
      addUserMessage,
      clearChatHistory,
      requestCompletion,
      results,
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
        <title>UrlaubGPT | Urlaubsangebote von CHECK24</title>
        <meta name="description" content="Urlaubsangebote von CHECK24" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DummyHeaderBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="bg-white">{renderPage()}</main>
      <DummyFooter />
    </>
  );
};

export default Home;
