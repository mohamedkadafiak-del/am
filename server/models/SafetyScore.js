const mongoose = require('mongoose');

const safetyScoreSchema = new mongoose.Schema({
  areaName: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true // [lng, lat]
    }
  },
  score: { type: Number, required: true, min: 0, max: 100 },
  lastUpdated: { type: Date, default: Date.now }
});

safetyScoreSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('SafetyScore', safetyScoreSchema);
