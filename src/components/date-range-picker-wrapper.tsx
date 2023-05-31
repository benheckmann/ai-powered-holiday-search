import moment, { Moment } from "moment";
import { useState } from "react";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import type { GlobalProps } from "../utils/types/global-props";

import "react-dates/initialize";

const DateRangePickerWrapper: React.FC<GlobalProps> = (props) => {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);
  const [startDate, setStartDate] = useState<Moment | null>(
    moment(props.query.filters.departureDate)
  );
  const [endDate, setEndDate] = useState<Moment | null>(moment(props.query.filters.returnDate));

  const handleDatesChange = ({
    startDate,
    endDate,
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="daterangepicker_start_date"
      endDate={endDate}
      endDateId="daterangepicker_end_date"
      onDatesChange={handleDatesChange}
      focusedInput={focusedInput}
      onFocusChange={(focusedInput: FocusedInputShape | null) => setFocusedInput(focusedInput)}
      hideKeyboardShortcutsPanel={true}
    />
  );
};

export default DateRangePickerWrapper;
