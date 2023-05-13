import { NextPage } from "next";
import { GlobalProps } from "./interfaces/global-props";
import { NLPSearchForm } from "./components/nlp-search-form";

export const SearchPage: NextPage<GlobalProps> = (props) => {
  // todo: add offer carousel
  return (
    <div>
      <NLPSearchForm {...props} />
    </div>
  );
};
