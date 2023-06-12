import { NextPage } from "next";
import { GlobalProps } from "../utils/types/global-props";
import NLPSearchForm from "./nlp-search-form";
import { Pages } from "~/utils/types/page-name-enum";

const SearchPage: NextPage<GlobalProps> = (props) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <NLPSearchForm {...props} />
      <p className="my-4">Oder</p>
      <button className="btn-neutral btn mb-4" onClick={() => props.setCurrentPage(Pages.RESULTS)}>
        Suche nach Filtern
      </button>
    </div>
  );
};

export default SearchPage;
