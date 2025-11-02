const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('appointments')
      .populate('plans');
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/me', auth, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update streak
router.post('/streak', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
    if (lastActive) {
      lastActive.setHours(0, 0, 0, 0);
    }

    const diffDays = lastActive ? Math.floor((today - lastActive) / (1000 * 60 * 60 * 24)) : null;

    if (!lastActive || diffDays === 1) {
      // Continue streak
      user.streak = (user.streak || 0) + 1;
    } else if (diffDays > 1) {
      // Reset streak
      user.streak = 1;
    }

    user.lastActiveDate = today;
    await user.save();

    res.json({ streak: user.streak });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

