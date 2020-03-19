import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const newDate = new Date();
const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const allDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// eslint-disable-next-line no-undef
ReactDOM.render(<App newDate={newDate} allMonths={allMonths} allDaysOfWeek={allDaysOfWeek} />, document.getElementById('app'));
