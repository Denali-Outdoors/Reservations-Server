import React from 'react';
import styled from 'styled-components';

import Title from './Title';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import PartySelector from './PartySelector';
import ReserveButton from './ReserveButton';

/*
currentDate: newDate,
months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
currentDayOfWeek: outsideDaysOfWeek[newDate.getDay()],
currentMonth: outsideMonths[newDate.getMonth()],
selectedDate: newDate,
selectedTime: newDate.getTime(),
selectedPartySize: 2,
*/


const AppWrapper = styled.div`
  border: 1px solid #f5f5f5;
  border-radius: 2px;
  height: 146px;
  width: 295px;
  background: white;
  padding-left: 5px;
`;

class App extends React.Component {
  constructor({ newDate, allMonths, allDaysOfWeek }) {
    super({ newDate, allMonths, allDaysOfWeek });
    this.state = {
      timeOptions: [],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      currentDayOfWeek: allDaysOfWeek[newDate.getDay()],
      currentMonth: allMonths[newDate.getMonth()],
      selectedDate: newDate,
      selectedTime: newDate.toLocaleTimeString('en-US'),
      selectedPartySize: 2,
    };
  }

  static getTimeOptions(date, time) {

  }

  render() {
    return (
      <AppWrapper>
        <Title />
        <DateSelector />
        <TimeSelector timeOptions={this.state.timeOptions} />
        <PartySelector />
        <ReserveButton />
      </AppWrapper>
    );
  }
}

export default App;
