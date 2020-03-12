const db = require('./db/index.js');
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