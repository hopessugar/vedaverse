const express = require('express');
const YogaPose = require('../models/YogaPose');

const router = express.Router();

// Get pose of the day
router.get('/pose-of-day', async (req, res) => {
  try {
    // Get a random pose (in production, use date-based selection)
    const poses = await YogaPose.find();
    const randomPose = poses[Math.floor(Math.random() * poses.length)];
    
    res.json(randomPose);
  } catch (error) {
    console.error(error);
    // Return default pose if database is empty
    res.json({
      name: "Tree Pose",
      sanskritName: "Vrikshasana",
      description: "A balancing pose that strengthens legs and improves concentration",
      image: "/images/yoga/tree-pose.jpg"
    });
  }
});

// Get all yoga poses
router.get('/', async (req, res) => {
  try {
    const poses = await YogaPose.find();
    res.json(poses);
  } catch (error) {
    console.error(error);
    res.json([]);
  }
});

module.exports = router;

