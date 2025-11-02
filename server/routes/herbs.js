const express = require('express');
const Herb = require('../models/Herb');

const router = express.Router();

// Get Jadi Buti recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const herbs = await Herb.find().limit(10);
    
    if (herbs.length === 0) {
      // Return default herbs if database is empty
      return res.json([
        {
          name: "Tulsi (Holy Basil)",
          benefits: ["Boosts immunity", "Supports respiratory health", "Reduces stress naturally"],
          image: "/images/herbs/tulsi.jpg"
        },
        {
          name: "Ashwagandha",
          benefits: ["Improves strength", "Enhances mental clarity", "Reduces anxiety"],
          image: "/images/herbs/ashwagandha.jpg"
        },
        {
          name: "Turmeric",
          benefits: ["Anti-inflammatory", "Supports digestion", "Boosts immunity"],
          image: "/images/herbs/turmeric.jpg"
        },
        {
          name: "Ginger",
          benefits: ["Aids digestion", "Reduces nausea", "Anti-inflammatory"],
          image: "/images/herbs/ginger.jpg"
        }
      ]);
    }
    
    res.json(herbs);
  } catch (error) {
    console.error(error);
    res.json([]);
  }
});

// Get all herbs
router.get('/', async (req, res) => {
  try {
    const herbs = await Herb.find();
    res.json(herbs);
  } catch (error) {
    console.error(error);
    res.json([]);
  }
});

module.exports = router;
