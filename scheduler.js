require('dotenv').config();
const express = require('express');
const scheduler = require('node-schedule-tz');
const { schedulerPort, ZONE_TW } = process.env;
const updateYouBike = require('./src/schedulers/updateYouBike');

const app = express();

scheduler.scheduleJob('更新 YouBike 資料', '* * * * *', ZONE_TW, async function() {
  await updateYouBike();
});

app.listen(schedulerPort, function() {
  console.log(`Scheduler on port: ${schedulerPort}`);
});

module.exports = app;
