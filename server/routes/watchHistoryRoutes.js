const express = require('express');
const router = express.Router();
const watchHistoryController = require('../controllers/watchHistoryController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, watchHistoryController.getWatchHistory);
router.post('/update', protect, watchHistoryController.updateProgress);

module.exports = router;
