const ServerErrors = require('../../helpers/ServerErrors');
const { YouBike } = require('../../schemas/YouBike');
const { Region } = require('../../schemas/Region');
const { QueryTypes } = require('sequelize');
const { mysql } = require('../../configs/mysqlSetting');

async function model(args) {
  try {
    const result = await searchArea(args.name);
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function searchArea(name) {
  try {
    const result = await mysql.query(
      `SELECT * 
         FROM YouBikes
    LEFT JOIN Regions ON Regions.id = YouBikes.region_id
        WHERE Regions.name LIKE :name`,
      {
        replacements: { name: `%${name}%` },
        type: QueryTypes.SELECT,
        raw: true
      });

    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

module.exports = model;
