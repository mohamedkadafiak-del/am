const Booking = require('../models/Booking');
const Driver = require('../models/Driver');

exports.createBooking = async (req, res) => {
  try {
    const { pickupLocation, dropLocation } = req.body;
    const booking = await Booking.create({
      user: req.user.id,
      pickupLocation,
      dropLocation,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('driver', 'name phone vehicleNumber');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNearbyDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({ status: 'available', isApproved: true }).select('name location');
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
