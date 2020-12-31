const { mysql } = require('../../configs/mysqlSetting');
const ServerErrors = require('../../helpers/ServerErrors');
const limit = 3;
const { QueryTypes } = require('sequelize');

async function model(args) {
  try {
    const result = await getMostCommentSortBySites(args);
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

// 取得最多評論的站，並根據每站的代碼作排序
async function getMostCommentSortBySites(args) {
  try {
    const offset = (args.page - 1) * limit;
    const result = await mysql.query(
      `SELECT YouBikes.id, YouBikes.name ,parking_num, available_num, address, address_en,
              Regions.name AS regionName, Regions.name_en AS regionNameEn,
              COUNT(*) AS comment_count FROM Comments
    LEFT JOIN YouBikes ON YouBikes.id = Comments.site_id
    LEFT JOIN Regions ON Regions.id = YouBikes.region_id
     GROUP BY site_id
     ORDER BY comment_count DESC, site_id
        LIMIT :limit OFFSET :offset`, {
        replacements: { limit, offset },
        type: QueryTypes.SELECT,
        raw: true
      });
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

module.exports = model;
