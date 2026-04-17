const mongoose = require('mongoose');
const User = require('./models/User');
const Driver = require('./models/Driver');
const Booking = require('./models/Booking');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ambulance-system');

    // Clear existing data
    await User.deleteMany({});
    await Driver.deleteMany({});
    await Booking.deleteMany({});

    // Create Sample User
    const user = await User.create({
      name: 'John Patient',
      email: 'user@example.com',
      password: 'password123',
      phone: '1234567890'
    });

    // Create Sample Drivers
    const driver1 = await Driver.create({
      name: 'Mike Driver',
      email: 'driver@example.com',
      password: 'password123',
      phone: '0987654321',
      licenseNumber: 'LIC123',
      vehicleNumber: 'AMB-001',
      status: 'available',
      isApproved: true
    });

    const driver2 = await Driver.create({
        name: 'Unapproved Driver',
        email: 'unapproved@example.com',
        password: 'password123',
        phone: '1112223333',
        licenseNumber: 'LIC456',
        vehicleNumber: 'AMB-002',
        status: 'offline',
        isApproved: false
      });

    // Create Sample Booking
    await Booking.create({
      user: user._id,
      driver: driver1._id,
      pickupLocation: '123 Main St',
      dropLocation: 'City Hospital',
      status: 'completed',
      fare: 500
    });

    console.log('Database Seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
