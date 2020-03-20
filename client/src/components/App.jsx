/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';

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

class App extends React.Component {
  constructor({ newDate, allMonths, allDaysOfWeek }) {
    super({ newDate, allMonths, allDaysOfWeek });
    this.state = {
      timeOptions: [],
      days: [],
      months: moment.months(),
      selectedDate: newDate,
      selectedPartySize: 2,
    };

    this.getTimeOptions = this.getTimeOptions.bind(this);
    this.setTimeOptions = this.setTimeOptions.bind(this);
    this.setSelectedTime = this.setSelectedTime.bind(this);
    this.setSelectedPartySize = this.setSelectedPartySize.bind(this);
    this.setDays = this.setDays.bind(this);
  }

  componentDidMount(time = this.props.newDate.format('h:mm a')) {
    this.setTimeOptions(time);
    this.setDays();
  }

  setTimeOptions(time = this.state.selectedDate.format('h:mm a')) {
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

  setDays() {
    const prevDays = []; // will capture all overflow days from prev month
    const currDays = []; // will capture all days from current month
    const nextDays = []; // will capture all overflow days from next month
    const weeks = []; // will hold all days grouped into weeks
    const prevMonth = moment(this.props.newDate).format('M') - 1;
    const nextMonth = moment(this.props.newDate).format('M') + 1;
    const firstDayIndex = moment(this.props.newDate).startOf('month').format('d');
    const lastDayIndex = moment(this.props.newDate).endOf('month').format('d');
    const daysInMonth = this.props.newDate.daysInMonth();
    const currentDay = this.state.selectedDate.day();

    const Day = (prev, curr, next, date, available, selected) => ({
      prev, curr, next, date, available, selected,
    });
    // Add previous Days
    for (let i = 0; i < firstDayIndex; i += 1) {
      prevDays.push(Day(true, false, false, 'xx', null, false));
    }
    // Add current Days
    for (let i = 1; i < daysInMonth + 1; i += 1) {
      if (i < currentDay) {
        prevDays.push(Day(false, true, false, i, null, false));
      } else if (i === currentDay) {
        prevDays.push(Day(false, true, false, i, null, true));
      } else {
        prevDays.push(Day(false, true, false, i, null, false));
      }
    }
    // Add next Days
    for (let i = 6 - lastDayIndex; i > 0; i -= 1) {
      nextDays.push(Day(false, false, true, 'yy', null, false));
    }
    // Put all days together to group into weeks
    const allDays = [...prevDays, ...currDays, ...nextDays];
    // Add weeks
    let tempWeek = [];
    allDays.forEach((day) => {
      tempWeek.push(day);
      if (tempWeek.length === 7) {
        weeks.push(tempWeek);
        tempWeek = [];
      }
    });
    // setState
    this.setState((state) => ({ ...state, days: [...weeks] }));
  }

  render() {
    return (
      <AppWrapper>
        <Title />
        <DateSelector matrixOfDays={this.state.days} />
        <TimeSelector timeOptions={this.state.timeOptions} setSelectedTime={this.setSelectedTime} />
        <PartySelector setSelectedPartySize={this.setSelectedPartySize} />
        <ReserveButton />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  newDate: PropTypes.object, /* Should be a Date object */
  allMonths: PropTypes.arrayOf(PropTypes.string),
  allDaysOfWeek: PropTypes.arrayOf(PropTypes.string),
};

App.defaultProps = {
  newDate: moment(),
  allMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  allDaysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

export default App;
