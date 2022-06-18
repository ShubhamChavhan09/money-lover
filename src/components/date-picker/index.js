import styled from "styled-components";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ModalButtons from "../modal-buttons";

const DatePicker = ({ dateRange, setDateRange }) => {
  const handleSelect = (item) => {
    setDateRange([item.selection]);
  };

  return (
    <Picker>
      <DateRange
        ranges={dateRange}
        onChange={handleSelect}
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        rangeColors={["#2EB84B"]}
      />
      <ModalButtons hidden />
    </Picker>
  );
};

export default DatePicker;

const Picker = styled.div`
  width: 100%;
  text-align: center;
`;
