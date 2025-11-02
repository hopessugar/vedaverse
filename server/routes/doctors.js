const express = require('express');
const Doctor = require('../models/Doctor');

const router = express.Router();

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific doctor
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Seed doctors (for initial setup)
router.post('/seed', async (req, res) => {
  try {
    const doctors = [
      {
        name: "Dr. Priya Sharma",
        specialty: "Ayurvedic Physician",
        rating: 4.9,
        reviewCount: 210,
        bio: "Expert in Ayurvedic medicine with 15+ years of experience",
        experience: 15,
        consultationFee: 49,
        availableSlots: [
          { day: "Monday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
          { day: "Wednesday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
          { day: "Friday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] }
        ]
      },
      {
        name: "Yogi Raj",
        specialty: "Yoga & Meditation Expert",
        rating: 4.7,
        reviewCount: 155,
        bio: "Certified yoga instructor specializing in therapeutic yoga",
        experience: 10,
        consultationFee: 35,
        availableSlots: [
          { day: "Tuesday", times: ["9:00 AM", "11:00 AM", "3:00 PM"] },
          { day: "Thursday", times: ["9:00 AM", "11:00 AM", "3:00 PM"] },
          { day: "Saturday", times: ["9:00 AM", "11:00 AM"] }
        ]
      }
    ];

    await Doctor.deleteMany({});
    await Doctor.insertMany(doctors);

    res.json({ message: 'Doctors seeded successfully', doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

