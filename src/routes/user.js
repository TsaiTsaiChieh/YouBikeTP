const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/postUser.controller'));

module.exports = router;
