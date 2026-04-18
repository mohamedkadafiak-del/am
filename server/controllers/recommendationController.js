const Movie = require('../models/Movie');
const WatchHistory = require('../models/WatchHistory');

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Recommendations based on Watch History (Genres)
    const history = await WatchHistory.find({ user: userId }).populate('movie');
    const watchedGenres = history.flatMap(h => h.movie.genre);
    const genreCounts = watchedGenres.reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {});
    const topGenre = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a])[0];

    let genreRecommendations = [];
    if (topGenre) {
      genreRecommendations = await Movie.find({
        genre: topGenre,
        _id: { $nin: history.map(h => h.movie._id) }
      }).limit(5);
    }

    // 2. Recommendations based on Time of Day
    const hour = new Date().getHours();
    let timeBasedMood = 'Happy';
    if (hour >= 20 || hour < 5) timeBasedMood = 'Thriller'; // Night
    else if (hour >= 5 && hour < 12) timeBasedMood = 'Action'; // Morning
    else if (hour >= 12 && hour < 17) timeBasedMood = 'Comedy'; // Afternoon
    else timeBasedMood = 'Love'; // Evening

    const timeBasedRecommendations = await Movie.find({ mood: timeBasedMood }).limit(5);

    // 3. "Because you watched..." (Last watched movie genre)
    let becauseYouWatched = [];
    if (history.length > 0) {
      const lastMovie = history[history.length - 1].movie;
      becauseYouWatched = await Movie.find({
        genre: { $in: lastMovie.genre },
        _id: { $ne: lastMovie._id }
      }).limit(5);
    }

    res.json({
      forYou: genreRecommendations,
      timeBased: { mood: timeBasedMood, movies: timeBasedRecommendations },
      becauseYouWatched: becauseYouWatched.length > 0 ? {
        title: history[history.length - 1].movie.title,
        movies: becauseYouWatched
      } : null
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
