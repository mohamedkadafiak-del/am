const Movie = require('../models/Movie');
const User = require('../models/User');

exports.uploadMovie = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnail, genre, mood, duration } = req.body;
    const movie = await Movie.create({
      title,
      description,
      videoUrl,
      thumbnail,
      genre,
      mood,
      duration
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const totalUsers = await User.countDocuments();
    const trendingMovies = await Movie.find({ isTrending: true }).limit(5);

    // Mock analytics for views and watch time
    const analytics = {
      totalMovies,
      totalUsers,
      totalViews: await Movie.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
      trendingMovies
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
