const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/user/login.controller'));
router.delete('/', require('../controllers/user/logout.controller'));

module.exports = router;
