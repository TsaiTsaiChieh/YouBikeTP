require('dotenv').config();
const express = require('express');
const { appPort } = process.env;
const bodyParser = require('body-parser');

const app = express();
// parse application/json
app.use(bodyParser.json());

app.use('/connection_mysql', require('./src/routes/connection'));
app.use('/migration', require('./src/routes/migration'));
app.use('/user', require('./src/routes/user'));
app.use('/token', require('./src/routes/token'));
app.use('/comment', require('./src/routes/comment'));

app.listen(appPort, function() {
  console.log(`YouBike on port: ${appPort}`);
});
module.exports = app;
