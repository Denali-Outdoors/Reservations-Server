import React from 'react';
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

const Calendar = ({ selectedDate, setSelectedDate, matrixOfDays }) => {
  return (
    <CalendarWrapper role="grid">
      <MonthWrapper role="heading">{selectedDate.format('MMMM')}</MonthWrapper>
      <TableWrapper role="rowgroup">
        <CalendarHeaders role="row" />
        {matrixOfDays.map((week) => (<RowWrapper role="row">{week.map((day) => <Day day={day} setSelectedDate={setSelectedDate} />)}</RowWrapper>))}
      </TableWrapper>
    </CalendarWrapper>
  );
};

Calendar.propTypes = {
  matrixOfDays: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
};

Calendar.defaultProps = {
  matrixOfDays: [[{}]],
};

export default Calendar;
