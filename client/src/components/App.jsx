import React from 'react';
import Title from './Title';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import PartySelector from './PartySelector';
import ReserveButton from './ReserveButton';

const App = () => (
  <div>
    <h1> App </h1>
    <Title />
    <DateSelector />
    <TimeSelector />
    <PartySelector />
    <ReserveButton />
  </div>
);

export default App;
