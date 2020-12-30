const { mysql } = require('../configs/mysqlSetting');
const { Sequelize } = require('sequelize');

const Comment = mysql.define('Comment', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  site_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'YouBikes',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    comment: '場站代碼'
  },
  uid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    comment: '評論者代碼'
  },
  comment: { type: Sequelize.STRING(256), allowNull: false, comment: '對場站的評論' }
});

module.exports = { Comment };
