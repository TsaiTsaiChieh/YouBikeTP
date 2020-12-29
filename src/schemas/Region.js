const { mysql } = require('../configs/mysqlSetting');
const { Sequelize } = require('sequelize');

const Region = mysql.define('Region', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'YouBikes',
      key: 'region_id'
    },
    onUpdate: 'CASCADE', // 將有所關聯的紀錄行進行刪除或修改
    onDelete: 'CASCADE', // 有存在的關聯紀錄行時，會禁止父資料表的刪除或修改動作
    comment: '所屬區域代碼'
  },
  name: { type: Sequelize.STRING(8), allowNull: false, comment: '中文場站區域(sarea)' },
  name_en: { type: Sequelize.STRING(64), allowNull: false, comment: '英文場站區域(sareaen)' }
},
{
  timestamps: false
});

module.exports = { Region };
