import React, { createContext, useState } from 'react';

export const ReservationsContext = createContext();
const newDate = new Date();
const outsideMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const outsideDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const ReservationsProvider = ({children}) => {
  const initialState = {
    currentDate: newDate,
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    currentDayOfWeek: outsideDaysOfWeek[newDate.getDay()],
    currentMonth: outsideMonths[newDate.getMonth()],
    selectedDate: newDate,
    selectedTime: newDate.getTime(),
    selectedPartySize: 2,
  };
  const [reservations, setReservations] = useState(initialState);
  return (
    <ReservationsContext.Provider value={[reservations, setReservations]}>
      {children}
    </ReservationsContext.Provider>
  );
};

export default ReservationsProvider;
