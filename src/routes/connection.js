const express = require('express');
const { INTERNAL_SERVER_ERROR } = require('http-status');
const { mysql } = require('../configs/mysqlSetting');
const router = express.Router();

router.get('/', async function(req, res) {
  try {
    await mysql.authenticate();
    return res.send('Connection has been established successfully.');
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: 'Unable to connect to the MySQL database',
      error: err
    });
  }
});

module.exports = router;
