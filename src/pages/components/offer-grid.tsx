import { GlobalProps } from "../interfaces/global-props";
import { OfferCard } from "./offer-card";

export const OfferGrid: React.FC<GlobalProps> = (props) => {
  const offers = props.cachedOffers.slice(-12);
  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {offers.map((offer, index) => (
          <OfferCard key={index} isLoading={props.isLoading} offer={offer} />
        ))}
      </div>
    </div>
  );
};
