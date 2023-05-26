import { GlobalProps } from "../../utils/types/global-props";
import { OfferCard } from "./offer-card";

export const OfferGrid: React.FC<GlobalProps> = (props) => {
  const offers = props.cachedOffers.slice(-12);
  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {offers.map((offer, index) => (
          <OfferCard key={index} isLoading={props.isLoading} offer={offer} />
        ))}
      </div>
    </div>
  );
};
