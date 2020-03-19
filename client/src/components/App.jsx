import React from 'react';
import styled from 'styled-components';

import ReservationsProvider from '../contexts/ReservationsContext';
import Title from './Title';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import PartySelector from './PartySelector';
import ReserveButton from './ReserveButton';

const AppWrapper = styled.div`
  border: 1px solid #f5f5f5;
  border-radius: 2px;
  height: 146px;
  width: 295px;
  background: white;
  padding-left: 5px;
`;

const App = ({timeOptions}) => (
  <ReservationsProvider>
    <AppWrapper>
      <Title />
      <DateSelector />
      <TimeSelector timeOptions={timeOptions} />
      <PartySelector />
      <ReserveButton />
    </AppWrapper>
  </ReservationsProvider>
);

export default App;
