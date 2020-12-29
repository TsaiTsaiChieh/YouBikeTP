const { mysql } = require('../configs/mysqlSetting');
const { Sequelize } = require('sequelize');

const User = mysql.define('User', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, comment: '使用者編號' },
  name: { type: Sequelize.STRING(16), allowNull: false, comment: '使用者姓名' },
  email: { type: Sequelize.STRING(64), allowNull: false, comment: '使用者帳號' },
  password: { type: Sequelize.STRING(32), allowNull: false, comment: '使用者加鹽後的密碼' }
}, {
  indexes: [{ fields: ['email'] }]
});

module.exports = { User };
