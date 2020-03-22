import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

/*
const Day = (prev, curr, next, date, available, selected, year, month) => ({
      prev, curr, next, date, available, selected, year, month
    });
*/
const DayWrapper = styled.div`
  display: table-cell;
  border-right: 1px solid #cccccc;
  height: 32px;
  font-size: 13px;
  vertical-align: middle;
  text-align: center;
  color: ${(props) => {
    if (props.day.next) {
      return '#8b9898';
    }
    if (props.day.prev) {
      return '#dce0e0';
    }
    if (props.day.selected) {
      return '#f0f3f8';
    }
    return '#333333';
  }};
  background-color: ${(props) => (props.day.selected ? '#d32323' : 'white')};
  cursor: ${(props) => (props.day.prev ? 'default' : 'pointer')};
  :hover {
    box-shadow: inset 0 0 2px #cddae2;
    background-color: #e2eaf1;
  }
`;
// lastchild no border
// next month #8b9898

// :hover
// box-shadow: inset 0 0 2px #cddae2;
// background: #f0f3f8;

// hover, availeble:
// box-shadow: inset 0 0 2px #cddae2;
// background: #f0f3f8;

const Day = ({ day, setSelectedDate }) => (
  <DayWrapper day={day} onClick={(e) => { e.preventDefault(); setSelectedDate(moment(`${day.year}-${day.month}-${day.date}`)); }}>
    {parseInt(day.date)}
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
