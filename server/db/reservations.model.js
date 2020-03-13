const db = require('./index.js');

module.exports.getReservations = (restaurantID, callback) => {
  db.query(`SELECT restaurants.id as restaurant, SUM(party_size) AS occupied, restaurants.max_seats AS capacity, date_time 
    FROM reservations INNER JOIN restaurants ON (restaurants.id = reservations.id_restaurants) 
    WHERE id_restaurants = ${restaurantID} GROUP BY date_time;`,
  (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};
