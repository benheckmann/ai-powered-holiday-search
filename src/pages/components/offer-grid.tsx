import { Hotel, Offer } from "@prisma/client";
import { GlobalProps } from "../../utils/types/global-props";
import { OfferCard } from "./offer-card";

export const OfferGrid: React.FC<GlobalProps> = (props) => {
  const offers: (Offer & { Hotel: Hotel })[] = props.results.data ?? [];
  console.log("dadT", props.results.data);

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {offers.map((offer, index) => (
          <div className="card w-full bg-base-100 shadow-xl">
            <figure>
              <img src="/mock-data/mock-hotel-image.png" alt="Offer" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {offer.Hotel.hotelname}
                <div className="badge-secondary badge">Last Minute Deal</div>
              </h2>
              <p>{JSON.stringify(offer)}</p>
              <div className="card-actions justify-end">
                <div className="badge-outline badge">300 Punkte</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
