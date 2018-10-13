const express = require('express');
const router = express.Router();

router.use('/scores', require('./scores'));
router.use('/rounds', require('./rounds'));

module.exports = router;