const express = require('express');
const router = express.Router();
const { createAlert, getActiveAlerts, resolveAlert } = require('../controllers/alertController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, createAlert);
router.get('/active', protect, authorize('admin', 'guardian'), getActiveAlerts);
router.put('/:id/resolve', protect, authorize('admin'), resolveAlert);

module.exports = router;
