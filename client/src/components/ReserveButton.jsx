import React, { useContext } from 'react';
import styled from 'styled-components';
import { ReservationsContext } from '../contexts/ReservationsContext';

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
  cursor: pointer;
  color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  transition: 0.6s;
  :hover {
    opacity: 0.8;
  }
`;

const ReserveButton = () => {
  return (
    <ButtonWrapper>Find a Table</ButtonWrapper>
  );
};

export default ReserveButton;
