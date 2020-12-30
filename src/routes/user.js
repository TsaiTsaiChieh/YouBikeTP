const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/registration.controller'));

module.exports = router;
