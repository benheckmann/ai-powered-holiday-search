import { NextPage } from "next";

import { GlobalProps } from "./interfaces/global-props";
import { FilterBar } from "./components/filter-bar";
import { OfferGrid } from "./components/offer-grid";
import { ChatWidget } from "./components/chat-widget";

export const ResultsPage: NextPage<GlobalProps> = (props) => {
  return (
    <div>
      <OfferGrid {...props} />
      <FilterBar {...props} />
      <ChatWidget {...props} key={props.messages.length} />
    </div>
  );
};
