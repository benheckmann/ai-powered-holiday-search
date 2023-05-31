export const DummyFooter: React.FC = () => {
    return (
      <div className="w-full bg-accent text-white">
        <div className="flex flex-wrap justify-center items-center py-4 px-10 text-center">
          <div className="w-full text-base-100">
            <div className="mb-2">
              <a href="" className="mr-4">Unsere AGB</a>
              <a href="" className="mr-4">Datenschutz</a>
              <a href="" className="mr-4">Impressum</a>
              <a href="" className="mr-4">Statusinformation</a>
              <a href="" className="mr-4">Service-Code</a>
            </div>
          </div>
          <div className="w-full">
            <p className="text-base-100">© 2023 CHECK24 Vergleichsportal Reise GmbH München. Alle Inhalte unterliegen unserem Copyright.</p>
          </div>
        </div>
      </div>
    );
  };
  