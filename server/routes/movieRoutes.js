const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, movieController.getMovies);
router.get('/trending', protect, movieController.getTrendingMovies);
router.get('/mood/:mood', protect, movieController.getMoviesByMood);
router.get('/search', protect, movieController.searchMovies);
router.get('/:id', protect, movieController.getMovieById);

module.exports = router;
