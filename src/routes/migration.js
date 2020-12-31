const express = require('express');
const router = express.Router();
const { YouBike } = require('../schemas/YouBike');
const { Region } = require('../schemas/Region');
const { User } = require('../schemas/User');
const { Comment } = require('../schemas/Comment');
const { INTERNAL_SERVER_ERROR } = require('http-status');
const regions = require('../json/regions.json');
const { Record } = require('../schemas/Record');

// 創立 schema
// router.get('/sync', async function(req, res) {
//   try {
//     await YouBike.sync();
//     await Region.sync();
//     await User.sync();
//     await Comment.sync();
//     await Record.sync();
//     return res.send('Sync DB.');
//   } catch (err) {
//     console.log(err);
//     return res.status(INTERNAL_SERVER_ERROR).json({
//       message: 'Unable to sync DB',
//       error: err
//     });
//   }
// });

// 新增場站的區域
router.get('/insert_region', async function(req, res) {
  regions.map(async function(region) {
    await Region.create(region);
  });
  return res.send('Insert region successfully.');
});

module.exports = router;
