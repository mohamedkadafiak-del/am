const Alert = require('../models/Alert');
const User = require('../models/User');

exports.createAlert = async (req, res) => {
  try {
    const { location } = req.body;
    const alert = await Alert.create({
      userId: req.user.id,
      location
    });

    await User.findByIdAndUpdate(req.user.id, { safetyStatus: 'emergency', location });

    // In a real app, we'd trigger SMS/Email here

    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getActiveAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ status: 'active' }).populate('userId', 'name phone');
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, { status: 'resolved' }, { new: true });
    await User.findByIdAndUpdate(alert.userId, { safetyStatus: 'safe' });
    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
