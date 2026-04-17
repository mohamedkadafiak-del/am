const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  status: { type: String, enum: ['available', 'busy', 'offline'], default: 'offline' },
  isApproved: { type: Boolean, default: false },
  location: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },
  role: { type: String, default: 'driver' },
  earnings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

driverSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

driverSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Driver', driverSchema);
