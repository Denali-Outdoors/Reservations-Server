import React, {createContext, useState} from 'react';

const ReservationsContext = createContext();

const ReservationsProvider = ({children}) => {
  const initialState = {};
  const [reservations, setReservations] = useState(initialState);
  return (
    <ReservationsContext.Provider value={[reservations, setReservations]}>
      {children}
    </ReservationsContext.Provider>
  );
};

export default ReservationsProvider;
