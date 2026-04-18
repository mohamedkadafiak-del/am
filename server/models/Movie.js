const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  genre: [{
    type: String,
    required: true
  }],
  mood: [{
    type: String,
    enum: ['Happy', 'Sad', 'Action', 'Love', 'Thriller', 'Comedy'],
    required: true
  }],
  duration: {
    type: String // e.g., "2h 15m"
  },
  releaseDate: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  subtitles: [{
    language: String,
    url: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);
