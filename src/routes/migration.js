const express = require('express');
const router = express.Router();
const { YouBike } = require('../schemas/YouBike');
const { Region } = require('../schemas/Region');
const { INTERNAL_SERVER_ERROR } = require('http-status');
const regions = require('../json/regions.json');

// router.get('/sync', async function(req, res) {
//   try {
//     await YouBike.sync();
//     await Region.sync();
//     return res.send('Sync DB.');
//   } catch (err) {
//     return res.status(INTERNAL_SERVER_ERROR).json({
//       message: 'Unable to sync DB',
//       error: err
//     });
//   }
// });

router.get('/insert_region', async function(req, res) {
  regions.map(async function(region) {
    await Region.create(region);
  });
  return res.send('Insert region successfully.');
});

module.exports = router;
