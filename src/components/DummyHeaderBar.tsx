import { Pages } from "~/utils/types/page-name-enum";

const DummyHeaderBar = ({
  currentPage,
  setCurrentPage,
}: {
  currentPage: Pages;
  setCurrentPage: (page: Pages) => void;
}) => {
  const handleIconClick = () => {
    window.open("https://github.com/benheckmann/check24-gendev-challenge", "_blank");
  };

  return (
    <div className={"fixed top-0 z-10 h-12 w-full bg-primary"}>
      <div className="flex justify-between px-10 py-3">
        <div>
          <a onClick={() => setCurrentPage(Pages.SEARCH)}>
            <img src="/logo.svg" alt="logo" className="h-6" />
          </a>
        </div>
        <div>
          <button onClick={handleIconClick}>
            <img src="/git-icon.png" alt="logo" className="h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DummyHeaderBar;
