const mongoose = require('mongoose');

const WatchHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  progress: {
    type: Number, // Percentage or seconds
    default: 0
  },
  lastWatched: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WatchHistory', WatchHistorySchema);
