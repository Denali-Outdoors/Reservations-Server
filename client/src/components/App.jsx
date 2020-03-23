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
  constructor({ newDate }) {
    super({ newDate });
    this.state = {
      timeOptions: [],
      days: [],
      nextDays: [],
      months: moment.months(),
      today: newDate,
      selectedDate: newDate,
      nextMonth: moment().add(1, 'months'),
      selectedPartySize: 2,
    };

    this.getTimeOptions = this.getTimeOptions.bind(this);
    this.setTimeOptions = this.setTimeOptions.bind(this);
    this.setSelectedTime = this.setSelectedTime.bind(this);
    this.setSelectedPartySize = this.setSelectedPartySize.bind(this);
    this.setDays = this.setDays.bind(this);
    this.setSelectedDate = this.setSelectedDate.bind(this);
  }

  componentDidMount() {
    this.setTimeOptions(this.state.selectedDate.format('h:mm a'));
    this.setDays(this.state.selectedDate, this.state.today);
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

  setSelectedDate(dateObj) {
    this.setState((state) => ({ ...state, selectedDate: dateObj }), () => { this.setDays(this.state.selectedDate, this.state.today); });
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

  setDays(selectedDate, currentDate) {
    const prevDays = []; // will capture all overflow days from prev month
    const currDays = []; // will capture all days from current month
    const nextDays = []; // will capture all overflow days from next month
    const weeks = []; // will hold all days grouped into weeks
    const nextPrevDays = []; // will capture relative to next month
    const nextMonthDays = []; // will capture relative to next month
    const nextNextDays = []; // will capture relative to next month
    const nextWeeks = []; // will capture relative to next month
    const prevMonth = moment().subtract(1, 'months');
    const nextMonth = moment().add(1, 'months');
    const nextNextMonth = moment().add(2, 'months');
    const firstDayIndex = moment(currentDate).startOf('month').format('d');
    const lastDayIndex = moment(currentDate).endOf('month').format('d');
    const firstDayNextMonthIndex = moment(nextMonth).startOf('month').format('d');
    const lastDayNextMonthIndex = moment(nextMonth).endOf('month').format('d');
    const daysInLastMonth = prevMonth.daysInMonth();
    const daysInMonth = currentDate.daysInMonth();
    const daysInNextMonth = nextMonth.daysInMonth();
    const selectedDay = selectedDate.date();
    const todaysDate = currentDate.date();
    const zeroPad = (num) => `0${num.toString()}`;

    const Day = (disabled, otherMonth, date, available, selected, year, month) => ({
      disabled, otherMonth, date, available, selected, year, month,
    });
    // Add previous Days
    for (let i = daysInLastMonth - firstDayIndex; i < daysInLastMonth; i += 1) {
      prevDays.push(Day(true, false, i + 1, null, false, prevMonth.format('YYYY'), prevMonth.format('MM')));
    }
    // Add previous Days for next month
    for (let i = daysInMonth - firstDayNextMonthIndex; i < daysInMonth; i += 1) {
      nextPrevDays.push(Day(false, true, i + 1, null, false, currentDate.format('YYYY'), currentDate.format('MM')));
    }
    // Add current Days
    for (let i = 1; i < daysInMonth + 1; i += 1) {
      if (i < todaysDate) {
        prevDays.push(Day(true, false, i < 10 ? zeroPad(i) : i, null, false, currentDate.format('YYYY'), currentDate.format('MM')));
      } else if (i === selectedDay) {
        currDays.push(Day(false, false, i < 10 ? zeroPad(i) : i, null, true, currentDate.format('YYYY'), currentDate.format('MM')));
      } else {
        currDays.push(Day(false, false, i < 10 ? zeroPad(i) : i, null, false, currentDate.format('YYYY'), currentDate.format('MM')));
      }
    }
    // Add current Days for next month
    for (let i = 1; i < daysInNextMonth + 1; i += 1) {
      if (i === selectedDay) {
        nextMonthDays.push(Day(false, false, i < 10 ? zeroPad(i) : i, null, true, nextMonth.format('YYYY'), nextMonth.format('MM')));
      } else if (i > nextMonth.date()) {
        nextMonthDays.push(Day(true, false, i < 10 ? zeroPad(i) : i, null, false, nextMonth.format('YYYY'), nextMonth.format('MM')));
      } else {
        nextMonthDays.push(Day(false, false, i < 10 ? zeroPad(i) : i, null, false, nextMonth.format('YYYY'), nextMonth.format('MM')));
      }
    }
    // Add next Days
    for (let i = 1; i < 7 - lastDayIndex; i += 1) {
      nextDays.push(Day(false, true, i < 10 ? zeroPad(i) : i, null, false, nextMonth.format('YYYY'), nextMonth.format('MM')));
    }
    // Add next Days for next month
    for (let i = 1; i < 7 - lastDayNextMonthIndex; i += 1) {
      nextNextDays.push(Day(true, false, i < 10 ? zeroPad(i) : i, null, false, nextNextMonth.format('YYYY'), nextNextMonth.format('MM')));
    }
    // Put all days together to group into weeks
    const allDays = [...prevDays, ...currDays, ...nextDays];
    const allNextMonthDays = [...nextPrevDays, ...nextMonthDays, ...nextNextDays];
    // Add weeks
    let tempWeek = [];
    allDays.forEach((day) => {
      tempWeek.push(day);
      if (tempWeek.length === 7) {
        weeks.push(tempWeek);
        tempWeek = [];
      }
    });
    allNextMonthDays.forEach((day) => {
      tempWeek.push(day);
      if (tempWeek.length === 7) {
        nextWeeks.push(tempWeek);
        tempWeek = [];
      }
    });
    // setState
    this.setState((state) => ({ ...state, days: [...weeks], nextDays: [...nextWeeks] }));
  }

  render() {
    return (
      <AppWrapper>
        <Title />
        <DateSelector selectedDate={this.state.selectedDate} setSelectedDate={this.setSelectedDate} thisMonth={this.state.days} nextMonth={this.state.nextDays} today={this.state.today} nextMoment={this.state.nextMonth}/>
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
};

App.defaultProps = {
  newDate: moment(),
};

export default App;
