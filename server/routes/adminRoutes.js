const express = require('express');
const router = express.Router();
const { getAnalytics, getAllUsers, getAllDrivers, approveDriver, manageBooking } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('admin'));

router.get('/analytics', getAnalytics);
router.get('/users', getAllUsers);
router.get('/drivers', getAllDrivers);
router.put('/drivers/approve/:id', approveDriver);
router.put('/bookings/:id', manageBooking);

module.exports = router;
