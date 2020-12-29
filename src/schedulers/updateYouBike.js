const axios = require('axios');
const { API } = process.env;
const { YouBike } = require('../schemas/YouBike');
const moment = require('moment');
const ServerErrors = require('../helpers/ServerErrors');

async function main() {
  try {
    const data = await getDataFromAPI();
    await upsertYouBikeTable(repackage(data));
    console.log('完成更新 YouBike 資訊');
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err.stack);
  }
}

async function getDataFromAPI() {
  try {
    const { data } = await axios.get(API);
    return Promise.resolve(data.retVal);
  } catch (err) {
    console.log(err);
    return Promise.reject(new ServerErrors.GetDataFromAPI(err.stack));
  }
}

function repackage(data) {
  const temp = {};
  for (const key in data) {
    temp[key] = {
      id: data[key].sno,
      name: data[key].sna,
      parking_num: parseInt(data[key].tot),
      available_num: parseInt(data[key].sbi),
      region_id: regionMapping(data[key].sarea),
      mday: moment(data[key].mday, 'YYYYMMDDhhmmss').valueOf(),
      lat: parseFloat(data[key].lat),
      lng: parseFloat(data[key].lng),
      address: data[key].ar,
      address_en: data[key].aren,
      vacant: parseInt(data[key].bemp),
      act: parseInt(data[key].act)
    };
  }
  return temp;
}

function regionMapping(area) {
  switch (area) {
    case '信義區':
      return 1;
    case '大安區':
      return 2;
    case '松山區':
      return 3;
    case '南港區':
      return 4;
    case '中山區':
      return 5;
    case '中正區':
      return 6;
    case '文山區':
      return 7;
    case '萬華區':
      return 8;
    case '大同區':
      return 9;
    case '內湖區':
      return 10;
    case '北投區':
      return 11;
    case '士林區':
      return 12;
    default:
      return `Unknown area: ${area}`;
  }
}

async function upsertYouBikeTable(data) {
  try {
    for (const key in data) {
      await YouBike.upsert(data[key], { where: { id: key } });
    }
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}
module.exports = main;
