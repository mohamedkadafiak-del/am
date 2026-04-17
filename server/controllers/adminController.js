const User = require('../models/User');
const Driver = require('../models/Driver');
const Booking = require('../models/Booking');

exports.getAnalytics = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const activeDrivers = await Driver.countDocuments({ status: 'available' });
    const completedTrips = await Booking.countDocuments({ status: 'completed' });
    const totalUsers = await User.countDocuments();

    res.json({
      totalBookings,
      activeDrivers,
      completedTrips,
      totalUsers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().select('-password');
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.manageBooking = async (req, res) => {
  try {
    const { action } = req.body; // 'cancel' or 'assign'
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (action === 'cancel') {
      booking.status = 'cancelled';
    }

    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
