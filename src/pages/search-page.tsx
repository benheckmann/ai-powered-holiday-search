import { NextPage } from "next";
import { GlobalProps } from "../utils/types/global-props";
import { NLPSearchForm } from "./components/nlp-search-form";

export const SearchPage: NextPage<GlobalProps> = (props) => {
  // todo: add offer carousel
  return (
    <div className="flex h-screen items-center justify-center">
      <NLPSearchForm {...props} />
    </div>
  );
};
