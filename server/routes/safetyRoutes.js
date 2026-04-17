const express = require('express');
const router = express.Router();
const { getSafetyScore, predictCrime } = require('../controllers/safetyController');

router.get('/score', getSafetyScore);
router.get('/predict', predictCrime);

module.exports = router;
