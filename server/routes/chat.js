const express = require('express');
const auth = require('../middleware/auth');
const { chatWithAI } = require('../services/aiService');

const router = express.Router();

// Chat with AI assistant
router.post('/', auth, async (req, res) => {
  try {
    const { message, context } = req.body;
    const user = req.user;

    // Get user context for better responses
    const userContext = {
      prakritiType: user.prakritiType,
      stressLevel: user.stressLevel,
      dietaryPreferences: user.dietaryPreferences,
      selectedDiseases: user.selectedDiseases
    };

    const response = await chatWithAI(message, userContext, context);

    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

