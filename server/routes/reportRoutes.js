const express = require('express');
const router = express.Router();
const { createReport, getReports, deleteReport } = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, createReport);
router.get('/', getReports);
router.delete('/:id', protect, authorize('admin'), deleteReport);

module.exports = router;
