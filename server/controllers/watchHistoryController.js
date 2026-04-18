const WatchHistory = require('../models/WatchHistory');

exports.updateProgress = async (req, res) => {
  try {
    const { movieId, progress } = req.body;
    const userId = req.user._id;

    let history = await WatchHistory.findOne({ user: userId, movie: movieId });

    if (history) {
      history.progress = progress;
      history.lastWatched = Date.now();
      await history.save();
    } else {
      history = await WatchHistory.create({
        user: userId,
        movie: movieId,
        progress
      });
    }

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWatchHistory = async (req, res) => {
  try {
    const history = await WatchHistory.find({ user: req.user._id })
      .populate('movie')
      .sort({ lastWatched: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
