import { NextPage } from "next";

import { GlobalProps } from "../utils/types/global-props";
import FilterBar from "./filter-bar";
import OfferGrid from "./offer-grid";
import ChatWidget from "./chat-widget";
import PageNavigationFooter from "./page-navigation-footer";

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
