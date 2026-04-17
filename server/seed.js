const mongoose = require('mongoose');
const User = require('./models/User');
const CrimeReport = require('./models/CrimeReport');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/crime-navigator';
    await mongoose.connect(mongoUri);

    // Clear existing data
    await User.deleteMany({});
    await CrimeReport.deleteMany({});

    console.log('Database cleared.');

    // Create Sample User
    const user = await User.create({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'password123',
      phone: '1234567890',
      role: 'user'
    });

    console.log('Sample user created.');

    // Create Sample Crime Reports (around NYC area)
    const crimes = [
      {
        type: 'Theft',
        location: { type: 'Point', coordinates: [-74.0060, 40.7128] }, // NYC center
        description: 'Stolen bicycle from sidewalk.',
        timestamp: new Date()
      },
      {
        type: 'Robbery',
        location: { type: 'Point', coordinates: [-74.0080, 40.7150] },
        description: 'Armed robbery near park entrance.',
        timestamp: new Date(Date.now() - 3600000 * 2)
      },
      {
        type: 'Vandalism',
        location: { type: 'Point', coordinates: [-74.0020, 40.7110] },
        description: 'Graffiti on storefront.',
        timestamp: new Date(Date.now() - 3600000 * 24)
      },
      {
        type: 'Assault',
        location: { type: 'Point', coordinates: [-74.0100, 40.7200] },
        description: 'Physical altercation in alley.',
        timestamp: new Date()
      },
      {
        type: 'Theft',
        location: { type: 'Point', coordinates: [-74.0050, 40.7135] },
        description: 'Shoplifting incident.',
        timestamp: new Date()
      }
    ];

    await CrimeReport.insertMany(crimes);
    console.log('Sample crime reports created.');

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding Error:', err);
    process.exit(1);
  }
};

seedData();
