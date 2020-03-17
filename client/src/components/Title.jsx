import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  margin-left: 10px;
  color: #333333;
`;

const Title = () => (
  <TitleWrapper>
    <h2 data-test="title">Make a Reservation</h2>
  </TitleWrapper>
);

export default Title;
