import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  background-color: #d32323;
  width: 290px;
  height: 30px;
  display: block;
  padding: 5px 24px 5px 30px;
  margin-top: 3px;
  border-radius: 3px;
  border: 1px solid #d32323;
  border-radius: 3px;
  
  color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const ReserveButton = () => (
  <ButtonWrapper>Find a Table</ButtonWrapper>
);

export default ReserveButton;
