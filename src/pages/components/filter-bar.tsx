import { useEffect, useState } from "react";
import { GlobalProps } from "../../utils/types/global-props";
import DatePicker from "react-datepicker";
import { MdOutlineFlightLand, MdOutlineFlightTakeoff, MdOutlineMan4 } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import { FaChild } from "react-icons/fa";

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
    <div className="fixed top-12 z-10 w-full bg-secondary px-10 py-3">
      <div className="flex justify-evenly items-center">
        <div>
          <MdOutlineFlightTakeoff />
          <input
            type="text"
            placeholder="Abflughafen"
            value={departureAirportField}
            onChange={(e) => setDepartureAirportField(e.target.value)}
            className="w-full rounded px-3 py-2"
            aria-label="Departure Airport"
          />
        </div>
        <div>
          <MdOutlineFlightLand />
          <input
            type="text"
            placeholder="Zielflughafen"
            value={destinationAirportField}
            onChange={(e) => setDestinationAirportField(e.target.value)}
            className="w-full rounded px-3 py-2"
            aria-label="Destination Airport"
          />
        </div>
        <div>
          <BsCalendar3 />
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
          <MdOutlineMan4 />
          <input
            type="number"
            value={countAdultsField}
            onChange={(e) => setCountAdultsField(parseInt(e.target.value))}
            className="w-full rounded px-3 py-2"
            aria-label="Adults"
          />
        </div>
        <div>
          <FaChild />
          <input
            type="number"
            value={countChildrenField}
            onChange={(e) => setCountChildrenField(parseInt(e.target.value))}
            className="w-full rounded px-3 py-2"
            aria-label="Children"
          />
        </div>
        <div>
          <button onClick={handleSubmitFields} className="btn-primary btn text-base-100">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
