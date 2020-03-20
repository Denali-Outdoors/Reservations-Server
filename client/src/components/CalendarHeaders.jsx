import React from 'react';
import styled from 'styled-components';

const RowWrapper = styled.div`
  display: table-row;
  border-bottom: 1px solid #e6e6e6;
`;

const DayHeader = styled.div`
  display: table-cell;
  width: 13.5%;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  color: #d32323;
`;

const CalendarHeaders = () => (
  <thead>
    <RowWrapper>
      <DayHeader>Su</DayHeader>
      <DayHeader>Mo</DayHeader>
      <DayHeader>Tu</DayHeader>
      <DayHeader>We</DayHeader>
      <DayHeader>Th</DayHeader>
      <DayHeader>Fr</DayHeader>
      <DayHeader>Sa</DayHeader>
    </RowWrapper>
  </thead>
);

export default CalendarHeaders;
