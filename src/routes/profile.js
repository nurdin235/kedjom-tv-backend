const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../Models/User');

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Find the user by the ID attached by the auth middleware
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/update
// @desc    Update user's profile
// @access  Private
router.put('/update', auth, async (req, res) => {
  const { name, username, gender, location, bio, phoneNumber } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.name = name;
    user.username = username;
    user.gender = gender;
    user.location = location;
    user.bio = bio;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;