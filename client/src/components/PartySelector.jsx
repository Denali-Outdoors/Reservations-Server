import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PartySelectorWrapper = styled.div`
  display: inline-block;
`;

const SelectWrapper = styled.select`
  width: 144px;
  height: 30px;
  padding: 5px 24px 5px 30px;
  margin-left: 3px;
  border-radius: 3px;
  border-color: #999999;
  background-color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;


const PartySelector = ({ setSelectedPartySize }) => (
  <PartySelectorWrapper>
    {/* eslint-disable-next-line max-len */}
    <SelectWrapper onChange={(e) => { e.preventDefault(); setSelectedPartySize(parseInt(e.target.value.substring(0, 1), 0)); }}>
      <option>1 person</option>
      <option>2 people</option>
      <option>3 people</option>
      <option>4 people</option>
      <option>5 people</option>
      <option>6 people</option>
    </SelectWrapper>
  </PartySelectorWrapper>
);

PartySelector.propTypes = {
  setSelectedPartySize: PropTypes.func,
};

PartySelector.defaultProps = {
  setSelectedPartySize: () => {},
};

export default PartySelector;
