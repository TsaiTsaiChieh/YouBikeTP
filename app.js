require('dotenv').config();
const express = require('express');
const { appPort } = process.env;

const app = express();

app.use('/connection_mysql', require('./src/routes/connection'));

app.listen(appPort, function() {
  console.log(`YouBike on port: ${appPort}`);
});
module.exports = app;
