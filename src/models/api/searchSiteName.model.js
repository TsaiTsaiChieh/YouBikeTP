const ServerErrors = require('../../helpers/ServerErrors');
const { YouBike } = require('../../schemas/YouBike');
const Op = require('sequelize').Op;

async function model(args) {
  try {
    const result = await searchSiteName(args);
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

// 根據中英文站名搜尋站場
async function searchSiteName(args) {
  try {
    const { name, name_en } = args;
    let result = {};
    if (name) {
      result = await YouBike.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
        raw: true
      });
    } else if (name_en) {
      result = await YouBike.findAll({
        where: { name_en: { [Op.like]: `%${name_en}%` } },
        raw: true
      });
    }
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

module.exports = model;
