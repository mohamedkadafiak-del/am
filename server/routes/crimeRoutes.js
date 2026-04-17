const express = require('express');
const router = express.Router();
const { addCrimeReport, getCrimeReports, deleteCrimeReport } = require('../controllers/crimeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getCrimeReports);
router.post('/', protect, authorize('admin'), addCrimeReport);
router.delete('/:id', protect, authorize('admin'), deleteCrimeReport);

module.exports = router;
