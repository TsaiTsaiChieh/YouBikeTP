const ServerErrors = require('../../helpers/ServerErrors');
const { YouBike } = require('../../schemas/YouBike');

async function model(args) {
  try {
    const result = await searchSiteByBikes(args.num);
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

// 根據可借車位數搜尋站場
async function searchSiteByBikes(num) {
  try {
    const result = await YouBike.findAll({ where: { available_num: num }, raw: true });
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

module.exports = model;
