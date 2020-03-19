import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const currentTime = new Date().toLocaleTimeString('en-US');
let hour = parseInt(currentTime.substring(0, currentTime.indexOf(':')), 0);
let minutes = parseInt(currentTime.substring(currentTime.indexOf(':'), currentTime.lastIndexOf(':')), 0) > 30 ? '30' : '00';
let isAfterNoon = currentTime.slice(-2) === 'PM';
const timeOptions = [];
const addTimeOptions = () => {
  if (hour === 11 && isAfterNoon) {
    return;
  }
  timeOptions.push(`${hour}:${minutes} ${isAfterNoon ? 'pm' : 'am'}`);
  minutes = minutes === '30' ? '00' : '30';
  timeOptions.push(`${hour}:${minutes} ${isAfterNoon ? 'pm' : 'am'}`);
  minutes = minutes === '30' ? '00' : '30';
  hour += 1;
  isAfterNoon = !isAfterNoon && hour === 12 ? !isAfterNoon : isAfterNoon;
  addTimeOptions();
};

addTimeOptions();

// eslint-disable-next-line no-undef
ReactDOM.render(<App timeOptions={timeOptions} />, document.getElementById('app'));
