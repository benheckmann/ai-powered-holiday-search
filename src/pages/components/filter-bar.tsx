import { useEffect, useState } from "react";
import { GlobalProps } from "../../utils/types/global-props";
import DatePicker from "react-datepicker";
import { MdOutlineFlightLand, MdOutlineFlightTakeoff, MdOutlineMan4 } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import { FaChild } from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css";
import { Pages } from "~/utils/types/page-name-enum";

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

  const handleGoBack = () => {
    props.setCurrentPage(Pages.SEARCH);
  };

  return (
    <div className="fixed top-12 z-10 w-full bg-secondary px-10 py-3">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={handleGoBack} className="btn-outline btn-primary btn">
            {"<"}
          </button>
        </div>
        <div className="flex-grow"></div>
        <MdOutlineFlightTakeoff size={24} className="mx-2" />
        <input
          type="text"
          placeholder="Abflughafen"
          value={departureAirportField}
          onChange={(e) => setDepartureAirportField(e.target.value)}
          className="mr-4 w-20 rounded px-3 py-2"
          aria-label="Departure Airport"
        />
        <div className="flex items-center">
          <MdOutlineFlightLand size={24} className="mx-2" />
          <input
            type="text"
            placeholder="Zielflughafen"
            value={destinationAirportField}
            onChange={(e) => setDestinationAirportField(e.target.value)}
            className="mr-4 w-20 rounded px-3 py-2"
            aria-label="Destination Airport"
          />
        </div>
        <div className="flex items-center">
          <BsCalendar3 size={24} className="mx-2" />
          <DatePicker
            selectsRange={true}
            startDate={dateRangeField[0]}
            endDate={dateRangeField[1]}
            onChange={([startDate, endDate]) => {
              setDateRangeField([startDate!, endDate!]);
            }}
            isClearable={true}
            className="w-56 rounded px-3 py-2"
          />
        </div>
        <div className="flex items-center">
          <MdOutlineMan4 size={24} className="mx-2" />
          <input
            type="number"
            value={countAdultsField}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setCountAdultsField(value < 0 ? 0 : value);
            }}
            className="mr-4 w-14 rounded px-3 py-2"
            aria-label="Adults"
          />
        </div>
        <div className="flex items-center">
          <FaChild size={16} className="mx-2" />
          <input
            type="number"
            value={countChildrenField}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setCountChildrenField(value < 0 ? 0 : value);
            }}
            className="mr-4 w-14 rounded px-3 py-2"
            aria-label="Children"
          />
        </div>
        <div>
          <button onClick={handleSubmitFields} className="btn-primary btn text-base-100">
            Suche
          </button>
        </div>
      </div>
    </div>
  );
};
