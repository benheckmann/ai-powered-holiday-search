import { OfferCardProps } from "../interfaces/offer-card-props";

export const OfferCard: React.FC<OfferCardProps> = (props) => (
  <div className="w-full max-w-xs bg-base-100 shadow-xl md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl">
    <figure>
      <img src="/mock-data/mock-hotel-image.png" alt="Offer" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">
        Mock Offer
        <div className="badge-secondary badge">Last Minute Deal</div>
      </h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-end">
        <div className="badge-outline badge">300 Punkte</div>
      </div>
    </div>
  </div>
);
