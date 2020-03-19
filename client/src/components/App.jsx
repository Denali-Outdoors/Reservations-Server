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

    this.getTimeOptions = this.getTimeOptions.bind(this);
    this.setTimeOptions = this.setTimeOptions.bind(this);
    this.setSelectedTime = this.setSelectedTime.bind(this);
    this.setSelectedPartySize = this.setSelectedPartySize.bind(this);
  }

  componentDidMount(time = this.props.newDate.toLocaleTimeString('en-US')) {
    this.setTimeOptions(time);
  }

  setTimeOptions(time = this.selectedTime) {
    const newTimeOptions = this.getTimeOptions(time);
    this.setState((state) => ({ ...state, timeOptions: newTimeOptions }));
  }

  setSelectedTime(time) {
    this.setState((state) => ({ ...state, selectedTime: time }));
  }

  setSelectedPartySize(num) {
    this.setState((state) => ({ ...state, selectedPartySize: num }));
  }

  // eslint-disable-next-line class-methods-use-this
  getTimeOptions(time) {
    let hour = parseInt(time.substring(0, time.indexOf(':')), 0);
    let minutes = parseInt(time.substring(time.indexOf(':'), time.lastIndexOf(':')), 0) > 30 ? '30' : '00';
    const amPM = time.slice(-2);
    let isAfterNoon = amPM === 'PM' || amPM === 'pm';
    const timeOptions = [];
    const addTimeOptions = () => {
      if (hour === 11 && isAfterNoon) {
        return;
      }
      isAfterNoon = !isAfterNoon && hour === 12 ? !isAfterNoon : isAfterNoon;
      timeOptions.push(`${hour}:${minutes} ${isAfterNoon ? 'pm' : 'am'}`);
      minutes = minutes === '30' ? '00' : '30';
      timeOptions.push(`${hour}:${minutes} ${isAfterNoon ? 'pm' : 'am'}`);
      minutes = minutes === '30' ? '00' : '30';
      hour = isAfterNoon && hour === 12 ? 1 : hour += 1;
      addTimeOptions();
    };
    addTimeOptions();
    return timeOptions;
  }

  render() {
    return (
      <AppWrapper>
        <Title />
        <DateSelector />
        <TimeSelector timeOptions={this.state.timeOptions} setSelectedTime={this.setSelectedTime} />
        <PartySelector />
        <ReserveButton />
      </AppWrapper>
    );
  }
}

export default App;
