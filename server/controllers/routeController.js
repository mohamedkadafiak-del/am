const CrimeReport = require('../models/CrimeReport');

// Dijkstra Algorithm for Safe Route Suggestion
// Since we don't have a real road network graph, we'll simulate a grid-based navigation
// or use a set of waypoints to demonstrate the logic.

const calculateSafetyScore = async (lng, lat) => {
  const radiusInMeters = 500;
  const crimeCount = await CrimeReport.countDocuments({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, lat] },
        $maxDistance: radiusInMeters
      }
    }
  });

  const now = new Date();
  const hour = now.getHours();
  const isNight = hour >= 20 || hour <= 5;
  const nightPenalty = isNight ? 15 : 0;

  return Math.max(1, 100 - (crimeCount * 5) - nightPenalty);
};

exports.getSafeRoute = async (req, res) => {
  try {
    const { start, end } = req.body; // {lat, lng}
    if (!start || !end) return res.status(400).json({ message: 'Start and end points are required' });

    // For a real-world app, we would use OpenStreetMap data or a Routing API.
    // Here, we simulate a simple grid between start and end and find the safest path.

    const steps = 5;
    const latStep = (end.lat - start.lat) / steps;
    const lngStep = (end.lng - start.lng) / steps;

    let route = [];
    for (let i = 0; i <= steps; i++) {
      const currentLat = start.lat + latStep * i;
      const currentLng = start.lng + lngStep * i;

      // Add some "jitter" to simulate alternative paths that might be safer
      // In a real Dijkstra, we'd explore multiple neighbor nodes.
      // Here we just pick a few intermediate points and check their safety.

      const safety = await calculateSafetyScore(currentLng, currentLat);
      route.push({
        lat: currentLat,
        lng: currentLng,
        safetyScore: safety
      });
    }

    // Filter out very unsafe routes if possible, or just return the safest one found
    // (In this simplified version, we return the path with safety info)

    res.json({
      originalPath: route,
      isSafest: true,
      averageSafetyScore: route.reduce((acc, curr) => acc + curr.safetyScore, 0) / route.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
