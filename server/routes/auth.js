const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB not connected! State:', mongoose.connection.readyState);
      return res.status(500).json({ 
        message: 'Database not connected. Please check MongoDB connection.',
        readyState: mongoose.connection.readyState
      });
    }

    // Check if user exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'vedaVerseSecret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error message:', error.message);
    
    // More specific error messages
    if (error.name === 'MongoServerError' || error.message?.includes('Mongo')) {
      res.status(500).json({ 
        message: 'Database connection error. Please check MongoDB connection.',
        error: error.message 
      });
    } else if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      res.status(400).json({ 
        message: `${field} already exists`,
        error: error.message 
      });
    } else {
      res.status(500).json({ 
        message: 'Server error during registration',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB not connected! State:', mongoose.connection.readyState);
      return res.status(500).json({ 
        message: 'Database not connected. Please check MongoDB connection.',
        readyState: mongoose.connection.readyState
      });
    }

    // Find user
    const user = await User.findOne({ 
      $or: [{ email: username }, { username: username }] 
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'vedaVerseSecret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        prakritiType: user.prakritiType || null,
        streak: user.streak || 0
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error message:', error.message);
    
    // More specific error messages
    if (error.name === 'MongoServerError' || error.message?.includes('Mongo')) {
      res.status(500).json({ 
        message: 'Database connection error. Please check MongoDB connection.',
        error: error.message 
      });
    } else if (error.name === 'CastError') {
      res.status(500).json({ 
        message: 'Invalid data format',
        error: error.message 
      });
    } else {
      res.status(500).json({ 
        message: 'Server error during login',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
});

module.exports = router;

