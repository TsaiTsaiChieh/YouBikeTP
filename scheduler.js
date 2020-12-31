require('dotenv').config();
const express = require('express');
const scheduler = require('node-schedule-tz');
const { schedulerPort, ZONE_TW } = process.env;
const updateYouBike = require('./src/schedulers/updateYouBike');
const createSiteRecord = require('./src/schedulers/createSiteRecord');
const moment = require('moment');

const now = Date.now();
const nowFormat = moment(now).format('YYYY/MM/DD HH:mm:ss');

const app = express();

scheduler.scheduleJob('更新 YouBike 資料', '* * * * *', ZONE_TW, async function() {
  console.log(`更新 YouBike 資料中... at ${nowFormat}`);
  await updateYouBike();
});

scheduler.scheduleJob('增加 YouBike 紀錄', '0 */1 * * *', ZONE_TW, async function() {
  console.log(`增加 YouBike 各站紀錄中... at ${nowFormat}`);
  await createSiteRecord(now);
});

app.listen(schedulerPort, function() {
  console.log(`Scheduler on port: ${schedulerPort}`);
});

module.exports = app;
