const express = require('express');
const router = express.Router();

router.get('/most_comment', require('../controllers/api/mostComments.controller'));
router.get('/search_site_name', require('../controllers/api/searchSiteName.controller'));
router.get('/search_area', require('../controllers/api/searchArea.controller'));
router.get('/search_bike', require('../controllers/api/searchBikes.controller'));

module.exports = router;
