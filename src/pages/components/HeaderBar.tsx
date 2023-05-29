import { Pages } from "~/utils/types/page-name-enum";

export const DummyHeaderBar = ({ currentPage }: { currentPage: Pages }) => {
  const handleIconClick = () => {
    alert("Ihre Daten werden in einer Sitzung gespeichert. Es ist kein Login erforderlich.");
  };

  return (
    <div className={"fixed top-0 z-10 h-12 w-full bg-primary"}>
      <div className="flex justify-between px-10 py-3">
        <div>
          <img src="/logo.svg" alt="logo" className="h-6" />
        </div>
        <div>
          <button onClick={handleIconClick}>
            <img src="/person-icon.svg" alt="logo" className="h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
