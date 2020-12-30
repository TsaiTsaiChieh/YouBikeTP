const express = require('express');
const router = express.Router();
const { verification } = require('../middlewares/verification');

router.post('/', verification, require('../controllers/comment/addComment.controller'));
router.patch('/', verification, require('../controllers/comment/updateComment.controller'));
router.delete('/', verification, require('../controllers/comment/deleteComment.controller'));

module.exports = router;
