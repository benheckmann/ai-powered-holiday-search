import { NextPage } from "next";
import { GlobalProps } from "./interfaces/global-props";
import { FilterBar } from "./components/filter-bar";
import { OfferGrid } from "./components/offer-grid";

export const ResultsPage: NextPage<GlobalProps> = (props) => {
  return (
    <div>
      <FilterBar {...props} />
      <OfferGrid {...props} />
    </div>
  );
};
