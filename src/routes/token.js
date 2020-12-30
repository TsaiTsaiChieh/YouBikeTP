const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/login.controller'));
router.delete('/', require('../controllers/logout.controller'));

module.exports = router;
