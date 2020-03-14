/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const model = require('./db/reservations.model.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Failed to start server: ${err}`);
  } else {
    console.log(`Listening on ${PORT}`);
  }
});

app.get('/reservations/:restaurantID/:partySize', (req, res) => {
  console.log(`GET /reservations/${req.params.restaurantID}/${req.params.partySize}`);
  model.getReservations(req.params.restaurantID, (err, results) => {
    if (err) {
      console.log('Error: ', err);
      res.status(400).send('Data could not be retrieved');
    } else {
      // FIND UNAVAILABLE DATE-TIMES
      // eslint-disable-next-line max-len
      const availability = results.map((dateTime) => ({ ...dateTime, available: dateTime.capacity - dateTime.occupied - req.params.partySize > 0 }))
        .filter((dateTime) => dateTime.available === false);

      res.status(200).send(availability);
    }
  });
});
