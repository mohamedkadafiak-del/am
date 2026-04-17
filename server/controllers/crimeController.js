const CrimeReport = require('../models/CrimeReport');

exports.addCrimeReport = async (req, res) => {
  try {
    const { type, coordinates, description, timestamp } = req.body;
    const report = await CrimeReport.create({
      type,
      location: {
        type: 'Point',
        coordinates: coordinates // [lng, lat]
      },
      description,
      timestamp,
      reportedBy: req.user.role === 'admin' ? null : req.user._id
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCrimeReports = async (req, res) => {
  try {
    const reports = await CrimeReport.find().sort({ timestamp: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCrimeReport = async (req, res) => {
  try {
    const report = await CrimeReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    await report.deleteOne();
    res.json({ message: 'Report removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
