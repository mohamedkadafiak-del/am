const express = require('express');
const router = express.Router();
const { getSafetyScore } = require('../controllers/safetyController');

router.get('/score', getSafetyScore);

module.exports = router;
