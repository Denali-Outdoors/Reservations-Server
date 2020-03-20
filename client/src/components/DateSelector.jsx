import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';

// Tue, Mar 17

const SelectWrapper = styled.div`
  width: 233px;
  height: 18px;
  display: block;
  padding: 5px 24px 5px 32px;
  margin-bottom: 3px;
  padding-top: 7px;
  padding-bottom: 3px;
  border-radius: 3px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  background-color: white;
  font-size: 13.33px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const DateSelector = ({ selectedDate, setSelectedDate, matrixOfDays}) => {
  const [calendar, setCalendar] = useState(false);

  return (
    <SelectWrapper onClick={() => { setCalendar(!calendar); }}>
      { `${selectedDate.format('ddd')}, ${selectedDate.format('MMM')} ${selectedDate.format('D')}` }
      { calendar ? <Calendar selectedDate={selectedDate} setDate={setSelectedDate} matrixOfDays={matrixOfDays} /> : null }
    </SelectWrapper>
  );
};
// https://fecreservations.s3-us-west-1.amazonaws.com/calendar.png

export default DateSelector;
