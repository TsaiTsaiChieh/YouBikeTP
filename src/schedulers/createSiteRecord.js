const { getDataFromAPI } = require('../helpers/databaseEngine');
const moment = require('moment');
const { Record } = require('../schemas/Record');
const ServerErrors = require('../helpers/ServerErrors');

async function main(now) {
  try {
    const data = await getDataFromAPI();
    await createSiteRecord(repackage(data, now)); // Create site record at every hour
    console.log('完成新增 YouBike 各站資訊');
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err.stack);
  }
}

// Repackage data field
function repackage(data, now) {
  const temp = {};
  const hour = moment(now).format('HH');

  for (const key in data) {
    const active = parseInt(data[key].act);
    if (active) { // 有營運的站才紀錄
      temp[key] = {
        site_id: data[key].sno,
        hour: hour,
        time: now,
        parking_num: parseInt(data[key].tot),
        available_num: parseInt(data[key].sbi),
        mday: moment(data[key].mday, 'YYYYMMDDhhmmss').valueOf(),
        vacant: parseInt(data[key].bemp)
      };
    }
  }
  return temp;
}

async function createSiteRecord(data) {
  try {
    for (const key in data) await Record.create(data[key]);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

module.exports = main;
