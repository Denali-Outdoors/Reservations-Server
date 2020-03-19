import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  color: #333333;
`;

const HeaderWrapper = styled.h2`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 21px;
`;

const Title = () => (
  <TitleWrapper>
    <HeaderWrapper data-test="title">Make a Reservation</HeaderWrapper>
  </TitleWrapper>
);

export default Title;
