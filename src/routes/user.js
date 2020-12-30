const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/user/registration.controller'));

module.exports = router;
