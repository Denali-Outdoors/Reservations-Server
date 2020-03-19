import React, { useState } from 'react';
import styled from 'styled-components';

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


const PartySelector = () => {
  const [ partySize, setPartySize ] = useState(2);
  return (
    <PartySelectorWrapper>
      <SelectWrapper>
        <option>1 person</option>
        <option>2 people</option>
        <option>3 people</option>
        <option>4 people</option>
        <option>5 people</option>
        <option>6 people</option>
      </SelectWrapper>
    </PartySelectorWrapper>
  );
};
// https://fecreservations.s3-us-west-1.amazonaws.com/party.png

export default PartySelector;
