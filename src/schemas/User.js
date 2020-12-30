const { mysql } = require('../configs/mysqlSetting');
const { Sequelize } = require('sequelize');

const User = mysql.define('User', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, comment: '使用者編號' },
  name: { type: Sequelize.STRING(16), allowNull: false, comment: '使用者姓名' },
  email: { type: Sequelize.STRING(64), allowNull: false, comment: '使用者帳號' },
  password: { type: Sequelize.STRING(72), allowNull: false, comment: '使用者加鹽後的密碼' },
  token: { type: Sequelize.STRING(64), comment: '使用者 token' },
  token_expired: { type: Sequelize.DATE, comment: 'token 過期時間' }
}, {
  indexes: [{ fields: ['email'] }, { fields: ['token'] }]
});

module.exports = { User };
