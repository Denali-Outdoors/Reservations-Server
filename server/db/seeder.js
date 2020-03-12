const db = require('./index');
const configure = require('./config');
const faker = require('faker');

const reservationCount = 2000; // WILL DETERMINE THE NUMBER OF RESERVATIONS TO ADD
const restaurantCount = 100; // WILL DETERMINE THE NUMBER OF RESTAURANT RECORDS TO ADD
// IF CHANGING NUMBER OF RESTAURANTS, CHANGE possible values for 'reservations.id_restaurants' VALUE WHERE RESERVATIONS ARE INSERTED

const insertRecords = () => {
  configure(db)
    .then(() => {
      for (let i = 0; i < restaurantCount; i++) {
        db.queryAsync(`INSERT INTO restaurants (name, max_seats) 
        VALUES ('${faker.company.companyName()}', ${faker.random.number({min: 10, max: 30})});`,
        (err) => {if (err) {  /* console.log(err.sqlMessage) */ }}) // errors will generate for 3-4% of restaurant insertions, ignoring
      }
    })
    .then(() => {
      for (let i = 0; i < reservationCount; i++) {
        // first, generate random dates in MySQL friendly format ('yyyy-mm-dd hh:mm:ss')
        let randomMonth = faker.random.number({min: 3, max: 4}).toString();
        if (randomMonth.length === 1) {
          randomMonth = '0' + randomMonth; // ENSURES THAT NO SINGLE-DIGIT NUMBERS ARE PASSED TO DATE STRING (MYSQL ERRORS)
        }
        let randomDay = faker.random.number({min: 1, max: 30}).toString();
        if (randomDay.length === 1) {
          randomDay = '0' + randomDay; // ENSURES THAT NO SINGLE-DIGIT NUMBERS ARE PASSED TO DATE STRING (MYSQL ERRORS)
        }
        let randomHour = faker.random.number({min: 9, max: 22}).toString();
        if (randomHour.length === 1) {
          randomHour = '0' + randomHour; // ENSURES THAT NO SINGLE-DIGIT NUMBERS ARE PASSED TO DATE STRING (MYSQL ERRORS)
        }
        let randomMinutes = faker.random.arrayElement(['00', '30']);
        let date = `2020-${randomMonth}-${randomDay} ${randomHour}:${randomMinutes}:00`;

        db.queryAsync(`INSERT INTO reservations (id_restaurants, party_size, date_time) 
        VALUES (${faker.random.number({min: 1, max: 95})}, ${faker.random.number({min: 2, max: 10})}, '${date}');`, // IF CHANGING NUMBER OF RESTAURANTS, CHANGE id_restaurants VALUE
        (err) => {if (err) {console.log(err.sqlMessage)}})
      }
    })
    .then(() => {
      console.log(`Successfully seeded database with ${restaurantCount} restaurants and ${reservationCount} reservations`);
      console.log('NOTE: Some 1-5 restaurants may fail to add on each iteration')
    })
    .catch((err) => {
      console.log(`Error adding records: ${err.stack}`)
    })
    .finally(() => {
      db.end((err) => {
        if (err) {
          console.log('Failed to disconnect from database') 
        } else {
          console.log('Disconnected from database')
        }
      });
    })
}

insertRecords();
