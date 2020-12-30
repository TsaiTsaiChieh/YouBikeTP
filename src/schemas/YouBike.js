const { mysql } = require('../configs/mysqlSetting');
const { Sequelize } = require('sequelize');

const YouBike = mysql.define('YouBike', {
  id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, comment: '站點代號(sno)' },
  name: { type: Sequelize.STRING(16), allowNull: false, comment: '中文場站名稱(sna)' },
  name_en: { type: Sequelize.STRING(64), allowNull: false, comment: '英文場站名稱(snaen)' },
  parking_num: { type: Sequelize.INTEGER(4), allowNull: false, comment: '場站總停車格(tot)' },
  available_num: { type: Sequelize.INTEGER(4), allowNull: false, comment: '可借車位數(sbi)' },
  region_id: { type: Sequelize.INTEGER, allowNull: false, comment: '所屬的區域代碼(sarea, sareaen)' },
  mday: { type: Sequelize.DATE, comment: '來源資料的更新時間' },
  lat: { type: Sequelize.DECIMAL(10, 8), comment: '緯度' },
  lng: { type: Sequelize.DECIMAL(11, 8), comment: '經度' },
  address: { type: Sequelize.STRING(64), allowNull: false, comment: '中文地址(ar)' },
  address_en: { type: Sequelize.STRING(128), allowNull: false, comment: '英文地址(aren)' },
  vacant: { type: Sequelize.INTEGER(4), allowNull: false, comment: '可還空位數(bemp)' },
  act: { type: Sequelize.BOOLEAN, allowNull: false, comment: '場站是否暫停營運(act)' }
}, {
  indexes: [{ fields: ['region_id'] }]
});

module.exports = { YouBike };
