
const getTimeOptions = (date, time) => {
  let hour = parseInt(time.substring(0, time.indexOf(':')), 0);
  let minutes = parseInt(time.substring(time.indexOf(':'), time.lastIndexOf(':')), 0) > 30 ? '30' : '00';
  let isAfterNoon = time.slice(-2) === ('PM' || 'pm');
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
};

const newDate = new Date();
const currentDay = newDate.getDay();
const currentTime = newDate.toLocaleTimeString('en-US');
console.log(getTimeOptions(currentDay, '10:00 pm'));
