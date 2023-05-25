import { useEffect, useState } from "react";
import { GlobalProps } from "../interfaces/global-props";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const FilterBar: React.FC<GlobalProps> = (props) => {
  const [departureAirport, setDepartureAirport] = useState(props.query.departureAirport);
  const [destinationAirport, setDestinationAirport] = useState(props.query.destinationAirport);
  const [dateRange, setDateRange] = useState([props.query.departureDate, props.query.returnDate]);
  const [countAdults, setCountAdults] = useState(props.query.countAdults);
  const [countChildren, setCountChildren] = useState(props.query.countChildren);

  useEffect(() => {
    props.setQuery({
      departureAirport,
      destinationAirport,
      departureDate: dateRange[0] || new Date(),
      returnDate: dateRange[1] || new Date(),
      countAdults,
      countChildren,
    });
    // perform database query, clear old offers and set new ones
    // TODO
  }, [departureAirport, destinationAirport, dateRange, countAdults, countChildren]);

  return (
    // TODO add a back button
    <div className="fixed top-0 w-full bg-primary">
      <div className="container mx-auto">
        <div className="flex justify-evenly p-5">
          <div>
            <label className="text-white block">Departure Airport</label>
            <input
              type="text"
              value={props.query.departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
              className="w-full rounded px-3 py-2"
              aria-label="Departure Airport"
            />
          </div>
          <div>
            <label className="text-white block">Destination Airport</label>
            <input
              type="text"
              value={destinationAirport}
              onChange={(e) => setDestinationAirport(e.target.value)}
              className="w-full rounded px-3 py-2"
              aria-label="Destination Airport"
            />
          </div>
          <div>
            <label className="text-white block">Dates</label>
            <DatePicker
              selectsRange={true}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={([startDate, endDate]) => {
                setDateRange([startDate!, endDate!]);
              }}
              isClearable={true}
            />
          </div>
          <div>
            <label className="text-white block">Adults</label>
            <input
              type="number"
              value={countAdults}
              onChange={(e) => setCountAdults(e.target.value)}
              className="w-full rounded px-3 py-2"
              aria-label="Adults"
            />
          </div>
          <div>
            <label className="text-white block">Children</label>
            <input
              type="number"
              value={countChildren}
              onChange={(e) => setCountChildren(e.target.value)}
              className="w-full rounded px-3 py-2"
              aria-label="Children"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
