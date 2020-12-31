const { mysql } = require('../configs/mysqlSetting');
const { Sequelize } = require('sequelize');

const Record = mysql.define('Record', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  site_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'YouBikes',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    comment: '場站代碼'
  },
  hour: { type: Sequelize.INTEGER(2), allowNull: false, comment: '爬取該資料的小時' },
  time: { type: Sequelize.DATE, allowNull: false, comment: '爬取該資料的時間' },
  parking_num: { type: Sequelize.INTEGER(4), allowNull: false, comment: '場站總停車格(tot)' },
  available_num: { type: Sequelize.INTEGER(4), allowNull: false, comment: '可借車位數(sbi)' },
  mday: { type: Sequelize.DATE, comment: '來源資料的更新時間' },
  vacant: { type: Sequelize.INTEGER(4), allowNull: false, comment: '可還空位數(bemp)' }
}, {
  indexes: [{ fields: ['time'] }]
});

module.exports = { Record };
