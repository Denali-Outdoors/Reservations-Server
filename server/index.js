const db = require('./db/index.js');
const model = require('./db/reservations.model.js');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Failed to start server: ${err}`);
  } else {
    console.log(`Listening on ${PORT}`)
  }
})

app.get('/reservations/:restaurantID', (req, res) => {
  console.log(`GET /reservations/${req.params.restaurantID}`);
  model.getReservations(req.params.restaurantID, (err, results) => {
    if (err) {
      console.log('Error: ', err);
      res.status(400).send('Data could not be retrieved');
    } else {
      res.status(200).send(results);
    }
  });
})