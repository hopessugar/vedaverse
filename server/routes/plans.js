const express = require('express');
const auth = require('../middleware/auth');
const Plan = require('../models/Plan');
const { getGeneralQuestions, getDiseaseQuestions, DISEASE_LIST } = require('../services/ayurvedicDoctorModel');
const { generatePersonalizedPlan } = require('../services/aiService');

const router = express.Router();

// Get general questions
router.get('/questions/general', auth, (req, res) => {
  try {
    const questions = getGeneralQuestions();
    // Convert to frontend format
    const formattedQuestions = Object.entries(questions).map(([key, value]) => ({
      id: key,
      question: value.q,
      options: Object.entries(value.options).map(([optKey, optValue]) => ({
        value: optKey,
        text: optValue
      })),
      doshaMap: value.dosha_map
    }));
    res.json({ questions: formattedQuestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get disease-specific questions
router.get('/questions/disease/:disease', auth, (req, res) => {
  try {
    const { disease } = req.params;
    if (!DISEASE_LIST.includes(disease)) {
      return res.status(400).json({ message: 'Invalid disease' });
    }
    
    const questions = getDiseaseQuestions(disease);
    // Convert to frontend format
    const formattedQuestions = Object.entries(questions).map(([key, value]) => ({
      id: key,
      question: value.q,
      options: Object.entries(value.options).map(([optKey, optValue]) => ({
        value: optKey,
        text: optValue
      })),
      doshaMap: value.dosha_map
    }));
    res.json({ questions: formattedQuestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get list of all diseases
router.get('/diseases', auth, (req, res) => {
  try {
    res.json({ diseases: DISEASE_LIST });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate personalized plan
router.post('/generate', auth, async (req, res) => {
  try {
    const {
      prakritiType,
      diseases,
      generalAnswers,
      diseaseAnswers,
      dietaryPreferences,
      stressLevel
    } = req.body;

    // Validate input
    if (!prakritiType || !diseases || !Array.isArray(diseases) || diseases.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!generalAnswers || !diseaseAnswers) {
      return res.status(400).json({ message: 'Missing answers' });
    }

    // Generate plan using Ayurvedic Doctor V5 model
    const userData = {
      prakritiType,
      diseases,
      generalAnswers,
      diseaseAnswers,
      dietaryPreferences: dietaryPreferences || [],
      stressLevel: stressLevel || 'Moderate'
    };

    const generatedPlan = await generatePersonalizedPlan(userData);

    // Save plan to database (matching Plan model schema)
    const savedPlan = new Plan({
      user: req.user.id,
      prakritiType,
      diseases,
      yogaPoses: generatedPlan.yogaPoses || [],
      dietPlan: generatedPlan.dietPlan || {},
      lifestyleTips: generatedPlan.lifestyleTips || [],
      dosAndDonts: generatedPlan.dosAndDonts || { dos: [], donts: [] },
      herbalRecommendations: generatedPlan.herbalRecommendations || [],
      generatedBy: 'AyurvedicDoctor_V5'
    });

    await savedPlan.save();

    res.json({
      plan: generatedPlan,
      planId: savedPlan._id,
      savedPlan: savedPlan,
      message: 'Plan generated successfully'
    });
  } catch (error) {
    console.error('Plan generation error:', error);
    console.error('Error stack:', error.stack);
    console.error('Request body:', JSON.stringify(req.body, null, 2));
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get user's plans
router.get('/', auth, async (req, res) => {
  try {
    const plans = await Plan.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select('-generalAnswers -diseaseAnswers'); // Don't send full answers
    
    res.json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific plan
router.get('/:id', auth, async (req, res) => {
  try {
    const plan = await Plan.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
