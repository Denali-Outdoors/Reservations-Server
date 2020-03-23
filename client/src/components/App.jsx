/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import $ from 'jquery';

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
  constructor({ restaurantID, newDate }) {
    super({ newDate });
    this.state = {
      restaurantID,
      timeOptions: [],
      days: [],
      nextDays: [],
      unavailable: [],
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
    this.getAvailability = this.getAvailability.bind(this);
    this.setAvailability = this.setAvailability.bind(this);
    this.postReservation = this.postReservation.bind(this);
    this.checkAvailability = this.checkAvailability.bind(this);
  }

  componentDidMount() {
    this.setTimeOptions(this.state.selectedDate.format('h:mm a'));
    this.getAvailability();
  }

  setTimeOptions(time = this.state.selectedDate.format('h:mm a')) {
    const newTimeOptions = this.getTimeOptions(time);
    this.setState((state) => ({ ...state, timeOptions: newTimeOptions }));
  }

  setSelectedTime(time) {
    this.setState((state) => ({ ...state, selectedTime: time }));
  }

  setSelectedPartySize(num) {
    this.setState((state) => ({ ...state, selectedPartySize: num }), this.getAvailability);
  }

  setSelectedDate(dateObj) {
    this.setState((state) => ({ ...state, selectedDate: dateObj }), () => { this.setDays(this.state.selectedDate, this.state.today); });
  }

  getAvailability() {
    $.get(`/reservations/${this.state.restaurantID}/${this.state.selectedPartySize}`, (results) => {
      this.setAvailability(results);
    });
  }

  setAvailability(results) {
    const unavailable = results.map((time) => moment(time.date_time));
    this.setState((state) => ({ ...state, unavailable }), () => {
      this.setDays(this.state.selectedDate, this.state.today);
    });
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

  // eslint-disable-next-line react/sort-comp
  checkAvailability(queryMoment) {
    return this.state.unavailable.filter((unavailableDay) => {
      return unavailableDay.format('l') === queryMoment.format('l');
    });
  }


  setDays(selectedDate = this.selectedDate, currentDate = this.state.today) {
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
    /*
    The Day object track if a given day is selectable (disabled), is prior to the current day or over a month away (otherMonth)
    a moment object associated with the day (date), an array of unavailable times/moment objects (unavailable), and 
    */
    const Day = (disabled, otherMonth, date, unavailable, selected, year, month) => ({
      disabled, otherMonth, date, unavailable, selected, year, month,
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
        currDays.push(Day(false, false, i < 10 ? zeroPad(i) : i, this.checkAvailability(moment(`${currentDate.format('YYYY')}-${currentDate.format('MMMM')}-${i}`)), false, currentDate.format('YYYY'), currentDate.format('MM')));
      }
    }
    // Add current Days for next month
    for (let i = 1; i < daysInNextMonth + 1; i += 1) {
      if (i === selectedDay) {
        nextMonthDays.push(Day(false, false, i < 10 ? zeroPad(i) : i, null, true, nextMonth.format('YYYY'), nextMonth.format('MM')));
      } else if (i > nextMonth.date()) {
        nextMonthDays.push(Day(true, false, i < 10 ? zeroPad(i) : i, null, false, nextMonth.format('YYYY'), nextMonth.format('MM')));
      } else {
        nextMonthDays.push(Day(false, false, i < 10 ? zeroPad(i) : i, this.checkAvailability(moment(`${nextMonth.format('YYYY')}-${nextMonth.format('MMMM')}-${i}`)), false, nextMonth.format('YYYY'), nextMonth.format('MM')));
      }
    }
    // Add next Days
    for (let i = 1; i < 7 - lastDayIndex; i += 1) {
      nextDays.push(Day(false, true, i < 10 ? zeroPad(i) : i, this.checkAvailability(moment(`${nextMonth.format('YYYY')}-${nextMonth.format('MMMM')}-${i}`)), false, nextMonth.format('YYYY'), nextMonth.format('MM')));
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

  postReservation() {
    const data = { restaurantID: this.state.restaurantID, date: this.state.selectedDay };
    $.post('/reservations', data, () => {
      console.log('Posted reservation to database');
    });
  }

  render() {
    return (
      <AppWrapper>
        <Title />
        <DateSelector selectedDate={this.state.selectedDate} setSelectedDate={this.setSelectedDate} thisMonth={this.state.days} nextMonth={this.state.nextDays} today={this.state.today} nextMoment={this.state.nextMonth}/>
        <TimeSelector timeOptions={this.state.timeOptions} setSelectedTime={this.setSelectedTime} />
        <PartySelector setSelectedPartySize={this.setSelectedPartySize} />
        <ReserveButton postReservation={this.postReservation} />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  newDate: PropTypes.object, /* Should be a Date object */
  restaurantID: PropTypes.number,
};

App.defaultProps = {
  newDate: moment(),
  restaurantID: 1,
};

export default App;
