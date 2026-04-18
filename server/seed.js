const mongoose = require('mongoose');
const User = require('./models/User');
const Movie = require('./models/Movie');
const WatchHistory = require('./models/WatchHistory');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cinestream');

    // Clear existing data
    await User.deleteMany({});
    await Movie.deleteMany({});
    await WatchHistory.deleteMany({});

    // Create Admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@cinestream.com',
      password: 'adminpassword',
      role: 'admin'
    });

    // Create Regular User
    const user = await User.create({
      name: 'Test User',
      email: 'user@example.com',
      password: 'password123',
      role: 'user',
      preferredGenres: ['Action', 'Sci-Fi']
    });

    // Create Sample Movies
    const movies = await Movie.insertMany([
      {
        title: 'Interstellar',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1000',
        genre: ['Sci-Fi', 'Drama'],
        mood: ['Action', 'Happy'],
        duration: '2h 49m',
        rating: 4.8,
        isTrending: true,
        views: 1200
      },
      {
        title: 'The Dark Knight',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1000',
        genre: ['Action', 'Crime'],
        mood: ['Thriller', 'Action'],
        duration: '2h 32m',
        rating: 4.9,
        isTrending: true,
        views: 2500
      },
      {
        title: 'The Hangover',
        description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=1000',
        genre: ['Comedy'],
        mood: ['Happy', 'Comedy'],
        duration: '1h 40m',
        rating: 4.5,
        isTrending: false,
        views: 800
      }
    ]);

    // Create Watch History
    await WatchHistory.create({
      user: user._id,
      movie: movies[0]._id,
      progress: 3600
    });

    console.log('CineStream Database Seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
