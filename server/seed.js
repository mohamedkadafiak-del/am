const mongoose = require('mongoose');
const User = require('./models/User');
const Report = require('./models/Report');
const Alert = require('./models/Alert');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/she-shield');

    // Clear existing data
    await User.deleteMany({});
    await Report.deleteMany({});
    await Alert.deleteMany({});

    // Create Sample Admin
    await User.create({
      name: 'Admin Shield',
      email: 'admin@sheshield.com',
      password: 'admin123',
      phone: '0000000000',
      role: 'admin'
    });

    // Create Sample User
    const user = await User.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      phone: '1234567890',
      role: 'user',
      emergencyContacts: [
        { name: 'John Doe', phone: '0987654321', relationship: 'Husband' }
      ]
    });

    // Create Sample Reports
    await Report.create({
        location: { lat: 12.9716, lng: 77.5946, address: 'Central Park' },
        description: 'Poor lighting in the north area',
        severity: 'medium'
    });

    console.log('Database Seeded with SHE SHIELD AI data!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
