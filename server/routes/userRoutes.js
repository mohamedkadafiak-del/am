const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, getNearbyDrivers, getUserProfile } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('user'));

router.post('/book', createBooking);
router.get('/bookings', getUserBookings);
router.get('/nearby-drivers', getNearbyDrivers);
router.get('/profile', getUserProfile);

module.exports = router;
