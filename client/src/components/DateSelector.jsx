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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const newDate = new Date();
const today = {
  month: newDate.getMonth(),
  day: newDate.getDay(),
};

const DateSelector = ({matrixOfDays}) => {
  const [date, setDate] = useState(today);
  const [calendar, setCalendar] = useState(false);

  return (
    <SelectWrapper onClick={() => { setCalendar(!calendar); }}>
      { `${days[date.day]}, ${months[date.month]} ${date.day.toString()}` }
      { calendar ? <Calendar setDate={setDate} matrixOfDays={matrixOfDays} /> : null }
    </SelectWrapper>
  );
};
// https://fecreservations.s3-us-west-1.amazonaws.com/calendar.png

export default DateSelector;
