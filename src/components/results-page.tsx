import { NextPage } from "next";

import { GlobalProps } from "../utils/types/global-props";
import FilterBar from "./filter-bar";
import OfferGrid from "./offer-grid";
import ChatWidget from "./chat-widget";
import PageNavigationFooter from "./page-navigation-footer";

const ResultsPage: NextPage<GlobalProps> = (props) => {
  return (
    <div>
      {props.query && props.query.filters && <FilterBar {...props} />}
      {props.results && props.query && props.query.filters && <OfferGrid {...props} />}
      {props.chatHistory && props.chatHistory.data && props.clearChatHistory && props.addUserMessage && <ChatWidget {...props} />}
      {props.results && props.query && props.results.data && <PageNavigationFooter {...props} />}
    </div>
  );
};

export default ResultsPage;
