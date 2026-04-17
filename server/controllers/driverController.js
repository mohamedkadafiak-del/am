const Booking = require('../models/Booking');
const Driver = require('../models/Driver');

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const driver = await Driver.findByIdAndUpdate(req.user.id, { status }, { new: true });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAssignedTrips = async (req, res) => {
  try {
    const bookings = await Booking.find({ driver: req.user.id }).populate('user', 'name phone');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = status;
    if (status === 'completed') {
      booking.completedAt = Date.now();
      booking.fare = 500; // Mock fare

      // Update driver earnings
      await Driver.findByIdAndUpdate(req.user.id, { $inc: { earnings: 500 } });
    }

    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPendingBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ status: 'pending' }).populate('user', 'name phone');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.acceptBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        if(!booking) return res.status(404).json({ message: 'Booking not found' });

        booking.driver = req.user.id;
        booking.status = 'accepted';
        await booking.save();

        await Driver.findByIdAndUpdate(req.user.id, { status: 'busy' });

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
