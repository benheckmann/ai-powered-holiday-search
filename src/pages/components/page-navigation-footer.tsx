import React from "react";
import { GlobalProps } from "../../utils/types/global-props";

export const PageNavigationFooter: React.FC<GlobalProps> = (props) => {
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
    props.setQuery({
      ...props.query,
      pageNumber: currentPage + 1,
    });
  };

  return (
    <div className="flex items-center justify-center py-4">
      <span className="text-gray-500 mr-2">
        Ergebnisse {currentPage * pageSize + 1} - {(currentPage + 1) * pageSize}
      </span>
      <button
        onClick={handlePrevPage}
        className={`rounded px-3 py-1 ${
          currentPage === 0 ? "bg-gray-200" : "bg-gray-700 text-white"
        }`}
        disabled={currentPage === 0}
      >
        &lt;
      </button>
      <button onClick={handleNextPage} className={`bg-gray-700 text-white rounded px-3 py-1`}>
        &gt;
      </button>
    </div>
  );
};
