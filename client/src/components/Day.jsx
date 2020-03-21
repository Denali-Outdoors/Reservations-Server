import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const DayWrapper = styled.div`
  display: table-cell;
  border-right: 1px solid #cccccc;
  height: 32px;
  font-size: 13px;
  vertical-align: middle;
  text-align: center;
  color: #333333;
`;

const Day = ({ day, setSelectedDate }) => (
  <DayWrapper onClick={(e) => { e.preventDefault(); setSelectedDate(moment(`${day.year}-${day.month}-${day.date}`)); }}>
    {day.date}
  </DayWrapper>
);

Day.propTypes = {
  day: PropTypes.object,
  setSelectedDate: PropTypes.func,
};

Day.defaultProps = {
  day: {},
  setSelectedDate: () => { },
};

export default Day;
