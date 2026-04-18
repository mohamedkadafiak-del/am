const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/upload', protect, admin, adminController.uploadMovie);
router.get('/analytics', protect, admin, adminController.getAnalytics);
router.get('/users', protect, admin, adminController.getAllUsers);

module.exports = router;
