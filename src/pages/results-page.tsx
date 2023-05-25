import { useEffect } from "react";
import { NextPage } from "next";

import { GlobalProps } from "./interfaces/global-props";
import { FilterBar } from "./components/filter-bar";
import { OfferGrid } from "./components/offer-grid";
import { ChatWidget } from "./components/chat-widget";
import { api } from "~/utils/api";

export const ResultsPage: NextPage<GlobalProps> = (props) => {
  // hack: refetch chat history every 500ms to check for new messages
  // useEffect(() => {
    // const interval = setInterval(() => {
    //   if (props.isLoading) {
    //     props.chatHistory.refetch();
    //     if (!props.chatHistory.isPreviousData) {
    //       props.setIsLoading(false); // todo: change this to a check where we know that the bot is done
    //     }
    //   }
    // }, 500);
    // return () => {
    //   clearInterval(interval);
    // };
  //   props.chatHistory.refetch()
  // }, [props.requestCompletion.isSuccess, props.addUserMessage.isSuccess]);

  return (
    <div>
      <OfferGrid {...props} />
      <FilterBar {...props} />
      <ChatWidget props={props} chatHistory={props.chatHistory} addUserMessage={props.addUserMessage} />
    </div>
  );
};
