const express = require('express');
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

const router = express.Router();

// Book appointment
router.post('/', auth, async (req, res) => {
  try {
    const { doctorId, serviceType, date, time, duration, price } = req.body;

    const appointment = new Appointment({
      user: req.user.id,
      doctor: doctorId,
      serviceType,
      date: new Date(date),
      time,
      duration: duration || 30,
      price
    });

    await appointment.save();

    // Update user's appointments
    await User.findByIdAndUpdate(req.user.id, {
      $push: { appointments: appointment._id }
    });

    // Populate doctor info
    await appointment.populate('doctor');

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's appointments
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id })
      .populate('doctor')
      .sort({ date: -1 });
    
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific appointment
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('doctor');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update appointment
router.put('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    ).populate('doctor');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel appointment
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: { status: 'Cancelled' } },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment cancelled', appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

