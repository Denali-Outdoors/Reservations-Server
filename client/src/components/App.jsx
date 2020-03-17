import React from 'react';
import styled from 'styled-components';

import Title from './Title';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import PartySelector from './PartySelector';
import ReserveButton from './ReserveButton';

const AppWrapper = styled.div`
  border: 1px solid #f5f5f5;
  border-radius: 2px;
  max-height: 146px;
  max-width: 295px;
  background: white;

`;

const App = () => (
  <AppWrapper>
    <Title />
    <DateSelector />
    <TimeSelector />
    <PartySelector />
    <ReserveButton />
  </AppWrapper>
);

export default App;
