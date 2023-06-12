import React from "react";
import { GlobalProps } from "../utils/types/global-props";

const PAGE_SIZE = 24;

const PageNavigationFooter: React.FC<GlobalProps> = (props) => {
  const pageSize = (props.results.data ?? []).length;
  const currentPage = props.query.pageNumber; // 0-indexed

  const handlePrevPage = () => {
    if (currentPage > 0) {
      props.setQuery({
        ...props.query,
        pageNumber: currentPage - 1,
      });
    }
  };

  const handleNextPage = () => {
    if (pageSize < PAGE_SIZE) {
      // not ideal, but count(*) for the total results might be worse for now
      return;
    }
    props.setQuery({
      ...props.query,
      pageNumber: currentPage + 1,
    });
  };

  return (
    <div className="flex items-center justify-center py-4">
      {props.results.isFetched ? (
        <>
          <span className="text-gray-500 mr-2">
            Ergebnisse {currentPage * pageSize + 1} - {(currentPage + 1) * pageSize}
          </span>
          <button
            onClick={handlePrevPage}
            className="btn-circle btn mx-2"
            disabled={currentPage === 0}
          >
            &lt;
          </button>
          <button
            onClick={handleNextPage}
            className="btn-circle btn mx-2"
            disabled={pageSize < PAGE_SIZE}
          >
            &gt;
          </button>
        </>
      ) : (
        <span className="text-gray-500 m-5">Ergebnisse werden geladen...</span>
      )}
    </div>
  );
};

export default PageNavigationFooter;
