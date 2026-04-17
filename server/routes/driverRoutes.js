const express = require('express');
const router = express.Router();
const { updateStatus, getAssignedTrips, updateBookingStatus, getPendingBookings, acceptBooking } = require('../controllers/driverController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('driver'));

router.put('/status', updateStatus);
router.get('/trips', getAssignedTrips);
router.get('/pending-requests', getPendingBookings);
router.post('/accept', acceptBooking);
router.put('/booking-status', updateBookingStatus);

module.exports = router;
