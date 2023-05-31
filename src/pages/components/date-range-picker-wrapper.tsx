import moment from "moment";
import { useState } from "react";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import { GlobalProps } from "../../utils/types/global-props";

import "react-dates/initialize";

/* eslint-disable */

export const DateRangePickerWrapper: React.FC<GlobalProps> = (props) => {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);
  const [startDate, setStartDate] = useState(moment(props.query.filters.departureDate));
  const [endDate, setEndDate] = useState(moment(props.query.filters.returnDate));

  const handleDatesChange = ({ startDate, endDate }: any) => {
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
      onFocusChange={(focusedInput: any) => setFocusedInput(focusedInput)}
      hideKeyboardShortcutsPanel={true}
    />
  );
};
