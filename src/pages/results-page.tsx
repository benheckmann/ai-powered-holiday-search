import { useEffect } from "react";
import { NextPage } from "next";

import { GlobalProps } from "../utils/types/global-props";
import { FilterBar } from "./components/filter-bar";
import { OfferGrid } from "./components/offer-grid";
import { ChatWidget } from "./components/chat-widget";
import { api } from "~/utils/api";
import { PageNavigationFooter } from "./components/page-navigation-footer";

export const ResultsPage: NextPage<GlobalProps> = (props) => {
  return (
    <div>
      <FilterBar {...props} />
      <OfferGrid {...props} />
      <ChatWidget {...props} />
      <PageNavigationFooter {...props} />
    </div>
  );
};
