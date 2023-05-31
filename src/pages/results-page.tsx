import { NextPage } from "next";

import { GlobalProps } from "../utils/types/global-props";
import FilterBar from "./components/filter-bar";
import OfferGrid from "./components/offer-grid";
import ChatWidget from "./components/chat-widget";
import PageNavigationFooter from "./components/page-navigation-footer";

const ResultsPage: NextPage<GlobalProps> = (props) => {
  return (
    <div>
      <FilterBar {...props} />
      <OfferGrid {...props} />
      <ChatWidget {...props} />
      <PageNavigationFooter {...props} />
    </div>
  );
};

export default ResultsPage;
