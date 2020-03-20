import React, { useState } from 'react';
import styled from 'styled-components';
import CalendarHeaders from './CalendarHeaders';


const CalendarWrapper = styled.div`
  position: relative;
  top: 12px;
  right: 35px;
  height: 200px;
  width: 293px;
  
  border: 1px solid #cccccc;
  border-radius: 3px;
  background-color: white;

  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  z-index: 99;

  vertical-align: baseline;
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

const Day = styled.div`
  display: table-cell;
  border-right: 1px solid #cccccc;
  height: 32px;
  font-size: 13px;
  vertical-align: middle;
  text-align: center;
  color: #333333;
`;

const Calendar = ({ matrixOfDays }) => {

  return (
    <CalendarWrapper role="grid">
      <MonthWrapper role="heading">STATIC</MonthWrapper>
      <TableWrapper role="rowgroup">
        <CalendarHeaders role="row" />
        {matrixOfDays.map((week) => <RowWrapper role="row">{week.map((day) => <Day role="gridcell" prevMonth={day.prev} nextMonth={!day.prev}>{day.date}</Day>)}</RowWrapper>)}
      </TableWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;
