const mongoose = require('mongoose');

const crimeReportSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Theft', 'Assault', 'Burglary', 'Robbery', 'Vandalism', 'Other']
  },
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
  timestamp: { type: Date, default: Date.now },
  description: { type: String },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

crimeReportSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('CrimeReport', crimeReportSchema);
