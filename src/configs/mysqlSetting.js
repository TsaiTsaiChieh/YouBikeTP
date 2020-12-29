const { Sequelize } = require('sequelize');
const { db, mysqlUsername, mysqlPassword, host, mysqlPort } = process.env;

const mysql = new Sequelize(db, mysqlUsername, mysqlPassword, {
  host: host,
  dialect: 'mysql',
  port: mysqlPort,
  timestamps: true,
  pool: {
    maxConnections: 10,
    minConnections: 0,
    maxIdleTime: 30000
  },
  logging: false,
  timezone: '+08:00'
});

module.exports = { mysql };
