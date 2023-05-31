import { NextPage } from "next";
import { GlobalProps } from "../utils/types/global-props";
import NLPSearchForm from "./nlp-search-form";

const SearchPage: NextPage<GlobalProps> = (props) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <NLPSearchForm {...props} />
    </div>
  );
};

export default SearchPage;
