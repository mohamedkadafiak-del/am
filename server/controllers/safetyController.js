const CrimeReport = require('../models/CrimeReport');
const SafetyScore = require('../models/SafetyScore');

// Safety Score = 100 - (crime_count * 5) - night_penalty
const calculateSafetyScore = (crimeCount, isNight) => {
  const nightPenalty = isNight ? 15 : 0;
  const score = 100 - (crimeCount * 5) - nightPenalty;
  return Math.max(0, score);
};

exports.getSafetyScore = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: 'Latitude and Longitude are required' });

    const radiusInMeters = 1000; // 1km radius
    const crimeCount = await CrimeReport.countDocuments({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: radiusInMeters
        }
      }
    });

    const now = new Date();
    const hour = now.getHours();
    const isNight = hour >= 20 || hour <= 5;

    const score = calculateSafetyScore(crimeCount, isNight);

    res.json({
      lat,
      lng,
      crimeCount,
      isNight,
      safetyScore: score
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.predictCrime = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: 'Latitude and Longitude are required' });

    // Basic rule-based logic for crime prediction
    const radiusInMeters = 2000; // 2km radius
    const historicalCrimes = await CrimeReport.countDocuments({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: radiusInMeters
        }
      }
    });

    const now = new Date();
    const hour = now.getHours();

    let riskFactor = historicalCrimes * 0.1;
    if (hour >= 22 || hour <= 4) riskFactor += 0.4;
    else if (hour >= 18) riskFactor += 0.2;

    let riskLevel = 'Low';
    let probability = Math.min(95, riskFactor * 100);

    if (probability > 70) riskLevel = 'High';
    else if (probability > 40) riskLevel = 'Medium';

    res.json({
      probability: Math.round(probability),
      riskLevel,
      factors: {
        historicalCrimes,
        timeOfDay: hour
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
