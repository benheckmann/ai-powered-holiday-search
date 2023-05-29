import { useEffect, useState } from "react";
import { GlobalProps } from "../../utils/types/global-props";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const FilterBar: React.FC<GlobalProps> = (props) => {
  const filters = props.query.filters;
  const [departureAirportField, setDepartureAirportField] = useState(filters.departureAirport);
  const [destinationAirportField, setDestinationAirportField] = useState(
    filters.destinationAirport
  );
  const [dateRangeField, setDateRangeField] = useState([filters.departureDate, filters.returnDate]);
  const [countAdultsField, setCountAdultsField] = useState(filters.countAdults);
  const [countChildrenField, setCountChildrenField] = useState(filters.countChildren);

  useEffect(() => {
    setDepartureAirportField(filters.departureAirport);
    setDestinationAirportField(filters.destinationAirport);
    setDateRangeField([filters.departureDate, filters.returnDate]);
    setCountAdultsField(filters.countAdults);
    setCountChildrenField(filters.countChildren);
  }, [props.query]);

  const handleSubmitFields = () => {
    const newFilters = {
      departureAirport: departureAirportField,
      destinationAirport: destinationAirportField,
      departureDate: dateRangeField[0] || new Date(),
      returnDate: dateRangeField[1] || new Date(),
      countAdults: countAdultsField,
      countChildren: countChildrenField,
    };
    props.setQuery({
      filters: newFilters,
      pageNumber: 0,
    });
  };

  return (
    <div className="fixed top-0 w-full bg-primary">
      <div className="container mx-auto">
        <div className="flex justify-evenly p-5">
          <div>
            <label className="text-white block">Departure Airport</label>
            <input
              type="text"
              value={departureAirportField}
              onChange={(e) => setDepartureAirportField(e.target.value)}
              className="w-full rounded px-3 py-2"
              aria-label="Departure Airport"
            />
          </div>
          <div>
            <label className="text-white block">Destination Airport</label>
            <input
              type="text"
              value={destinationAirportField}
              onChange={(e) => setDestinationAirportField(e.target.value)}
              className="w-full rounded px-3 py-2"
              aria-label="Destination Airport"
            />
          </div>
          <div>
            <label className="text-white block">Dates</label>
            <DatePicker
              selectsRange={true}
              startDate={dateRangeField[0]}
              endDate={dateRangeField[1]}
              onChange={([startDate, endDate]) => {
                setDateRangeField([startDate!, endDate!]);
              }}
              isClearable={true}
            />
          </div>
          <div>
            <label className="text-white block">Adults</label>
            <input
              type="number"
              value={countAdultsField}
              onChange={(e) => setCountAdultsField(parseInt(e.target.value))}
              className="w-full rounded px-3 py-2"
              aria-label="Adults"
            />
          </div>
          <div>
            <label className="text-white block">Children</label>
            <input
              type="number"
              value={countChildrenField}
              onChange={(e) => setCountChildrenField(parseInt(e.target.value))}
              className="w-full rounded px-3 py-2"
              aria-label="Children"
            />
          </div>
          <div>
            <button
              onClick={handleSubmitFields}
              className="bg-white rounded px-3 py-2 font-bold text-base-100"
              aria-label="Submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
