const Report = require('../models/Report');

exports.getSafetyScore = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    // Mock safety score calculation
    // In a real app, this would query a crime database and use ML
    let score = 85; // Base score

    const hour = new Date().getHours();
    if (hour > 22 || hour < 5) {
      score -= 20; // Lower score at night
    }

    // Adjust based on user reports in proximity
    const nearbyReports = await Report.find({
      'location.lat': { $gt: lat - 0.01, $lt: parseFloat(lat) + 0.01 },
      'location.lng': { $gt: lng - 0.01, $lt: parseFloat(lng) + 0.01 }
    });

    score -= nearbyReports.length * 5;

    // Clamp score
    score = Math.max(0, Math.min(100, score));

    let status = 'Green';
    if (score < 40) status = 'Red';
    else if (score < 70) status = 'Yellow';

    res.json({ score, status, factors: ['Time of day', 'Nearby reports'] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
