const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super-admin', 'guest'],
    default: 'user',
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  location: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
    default: 'https://res.cloudinary.com/dvz0kgv8i/image/upload/v1721959773/default-profile.png'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);