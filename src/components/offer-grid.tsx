import { Hotel, Offer } from "@prisma/client";
import { GlobalProps } from "../utils/types/global-props";
import StarRating from "./star-rating";

const PAGE_SIZE = 12;
const PLACEHOLDER_IMG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23d1d5db' /%3E%3C/svg%3E`;

const OfferGrid: React.FC<GlobalProps> = (props) => {
  const offers: (Offer & { Hotel: Hotel })[] =
    (props.results.data as (Offer & { Hotel: Hotel })[]) ?? []; // casting
  const isLoading = props.results.isLoading;
  const isFetched = props.results.isFetched;
  const isNotMallorca =
    props.query.filters.destinationAirport.length > 0 &&
    props.query.filters.destinationAirport !== "PMI";
  const isEmpty = isFetched && offers.length === 0;

  if (isNotMallorca || isEmpty) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        {isNotMallorca ? (
          <h2 className="text-center">
            Es scheint als hättest Sie sich für den Zielflughafen{" "}
            {props.query.filters.destinationAirport} entschieden. <br />
            Diese Suche ist möglich, aber unsere Daten beziehen sich nur auf Mallorca (PMI). <br />
            Sie können das Ziel über die Filter oder per Chat verändern.
          </h2>
        ) : (
          <h2 className="text-center">Ihre Suche ergab leider keine Ergebnisse.</h2>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-28 px-4">
      <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: isLoading ? PAGE_SIZE : offers.length }).map((_, index) => (
          <div key={index} className="card w-full bg-base-100 shadow-xl">
            <figure>
              {isLoading ? (
                <img
                  className="h-56 w-full animate-pulse object-cover"
                  src={PLACEHOLDER_IMG}
                  alt="placeholder"
                />
              ) : (
                <img
                  src={`/mock-hotel-images/mock-hotel-image-${
                    (offers[index]?.hotelid ?? 0) % 10
                  }.jpeg`}
                  className="h-56 w-full object-cover"
                  alt="Offer"
                />
              )}
            </figure>
            <div className="card-body">
              {isLoading ? (
                <>
                  <div className="my-0.5 h-6 animate-pulse rounded bg-neutral"></div>
                  <div className="my-0.5 h-4 animate-pulse rounded bg-neutral"></div>
                  <div className="my-0.5 h-4 animate-pulse rounded bg-neutral"></div>
                  <div className="my-0.5 h-4 animate-pulse rounded bg-neutral"></div>
                  <div className="my-0.5 h-4 animate-pulse rounded bg-neutral"></div>
                  <div className="my-0.5 h-4 animate-pulse rounded bg-neutral"></div>
                </>
              ) : (
                <>
                  <h2 className="card-title">{offers[index]?.Hotel.hotelname}</h2>
                  <StarRating rating={offers[index]?.Hotel.hotelstars ?? 0} />
                  <p>
                    Ab {offers[index]?.price} €<br />
                    Erw.: {offers[index]?.countadults}, Kinder: {offers[index]?.countchildren}{" "}
                    <br />
                    Daten: {offers[index]?.outbounddeparturedatetime?.toLocaleDateString()} -{" "}
                    {offers[index]?.inboundarrivaldatetime?.toLocaleDateString()} <br />
                    Zimmer: {offers[index]?.roomtype} <br />
                  </p>
                  <div className="card-actions justify-start">
                    <div className="badge-outline badge">
                      {Math.floor(Math.floor((offers[index]?.price ?? 0) / 10) / 50) * 50} Punkte
                    </div>
                    {(offers[index]?.price ?? 0) % 4 == 0 ? (
                      <div className="badge-secondary badge">Last Minute Deal</div>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferGrid;
