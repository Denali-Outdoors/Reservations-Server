import React, { useState } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

const TimeSelectorWrapper = styled.div`
  display: inline-block;
`;

const SelectWrapper = styled.select`
  width: 144px;
  height: 30px;
  padding: 5px 24px 5px 30px;
  border-radius: 3px;
  border-color: #999999;
  background-color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const ImgWrapper = styled.img`
  position: absolute;
  top: 3px;
  left: 3px;
`;

const TimeSelector = ({ timeOptions }) => (
  <TimeSelectorWrapper>
    {/* <ImgWrapper src="../assets/clock.png" /> */}
    <SelectWrapper>
      {/* eslint-disable-next-line react/prop-types */}
      {timeOptions.map((time) => (<option key={time}>{time}</option>))}
    </SelectWrapper>
  </TimeSelectorWrapper>
);


// TimeSelector.propTypes = {
//   timeOptions: PropTypes.arrayOf(PropTypes.string),
// };

// TimeSelector.defaultProps = {
//   timeOptions: [],
// };
// https://fecreservations.s3-us-west-1.amazonaws.com/clock.png

export default TimeSelector;
