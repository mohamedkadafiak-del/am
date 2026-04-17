const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Driver = require('../models/Driver');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, phone });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerDriver = async (req, res) => {
  try {
    const { name, email, password, phone, licenseNumber, vehicleNumber } = req.body;
    const driverExists = await Driver.findOne({ email });
    if (driverExists) return res.status(400).json({ message: 'Driver already exists' });

    const driver = await Driver.create({ name, email, password, phone, licenseNumber, vehicleNumber });
    res.status(201).json({
      _id: driver._id,
      name: driver.name,
      email: driver.email,
      role: driver.role,
      token: generateToken(driver._id, driver.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginDriver = async (req, res) => {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findOne({ email });
    if (driver && (await driver.comparePassword(password))) {
      res.json({
        _id: driver._id,
        name: driver.name,
        email: driver.email,
        role: driver.role,
        isApproved: driver.isApproved,
        token: generateToken(driver._id, driver.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // For simplicity, using environment variables for admin credentials
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ambulance.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email === adminEmail && password === adminPassword) {
      res.json({
        role: 'admin',
        token: generateToken('admin_id', 'admin'),
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
