import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CalendarHeaders from './CalendarHeaders';
import Day from './Day';


const CalendarWrapper = styled.div`
  position: relative;
  top: 12px;
  right: 35px;
  width: 293px;
  
  border: 1px solid #cccccc;
  border-radius: 3px;
  background-color: white;

  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  z-index: 99;

  box-shadow: 0 1px 2px #0a0a0a33;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  justify-content: center;
  border-spacing: 0;
  border-collapse: collapse;
`;

const MonthWrapper = styled.h2`
  margin: auto;
  margin-top: 8px;
  margin-bottom: 5px;
  height: 20px;
  font-size: 16px;
  color: #333333;
  text-align: center;
  display: table-caption;
`;

const TableWrapper = styled.div`
  margin:auto;
  margin-top: 6px;
  display: table;
  width: 295px;
  border-collapse: collapse;
`;

const RowWrapper = styled.div`
  display: table-row;
  border-bottom: 1px solid #cccccc;
`;

const NavButton = styled.button`
  border: none;
  background: white;
  :focus {
    outline: 0;
  }
`;

const Calendar = ({ selectedDate, setSelectedDate, thisMonth, nextMonth, currentDate, nextMoment }) => {
  const [month, setMonth] = useState(selectedDate.format('MMMM') === currentDate.format('MMMM'));
  const thisMonthDays = thisMonth.map((week, weekIndex) => (<RowWrapper key={weekIndex}>{week.map((day, dayIndex) => <Day key={`${weekIndex}${dayIndex}`} day={day} setSelectedDate={day.disabled ? () => {} : setSelectedDate} />)}</RowWrapper>));
  const nextMonthDays = nextMonth.map((week, weekIndex) => (<RowWrapper key={weekIndex}>{week.map((day, dayIndex) => <Day key={`${weekIndex}${dayIndex}`} day={day} setSelectedDate={day.disabled ? () => {} : setSelectedDate} />)}</RowWrapper>));
  return (
    <CalendarWrapper>
      <NavButton onClick={(e) => { e.stopPropagation(); setMonth(!month); }}>{ month ? '>' : '<' }</NavButton>
      <MonthWrapper>{ month ? `${currentDate.format('MMMM')} ${currentDate.format('YYYY')}` : `${nextMoment.format('MMMM')} ${nextMoment.format('YYYY')}`}</MonthWrapper>
      <TableWrapper>
        <CalendarHeaders />
        { month ? thisMonthDays : nextMonthDays}
      </TableWrapper>
    </CalendarWrapper>
  );
};

Calendar.propTypes = {
  selectedDate: PropTypes.object,
  setSelectedDate: PropTypes.func,
  thisMonth: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  nextMonth: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  currentDate: PropTypes.object,
  nextMoment: PropTypes.object,
};

Calendar.defaultProps = {
  selectedDate: {},
  setSelectedDate: () => {},
  thisMonth: [[{}]],
  nextMonth: [[{}]],
  currentDate: {},
  nextMoment: {},
};

export default Calendar;
