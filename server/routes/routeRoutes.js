const express = require('express');
const router = express.Router();
const { getSafeRoute } = require('../controllers/routeController');

router.post('/calculate', getSafeRoute);

module.exports = router;
