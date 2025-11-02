const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get Prakarti quiz questions
router.get('/quiz', (req, res) => {
  const questions = [
    {
      id: 1,
      question: "What is your body frame?",
      options: [
        { value: "vata", text: "Thin, light frame" },
        { value: "pitta", text: "Medium, well-proportioned" },
        { value: "kapha", text: "Large, heavy frame" }
      ]
    },
    {
      id: 2,
      question: "How would you describe your skin?",
      options: [
        { value: "vata", text: "Dry, rough, cold" },
        { value: "pitta", text: "Oily, warm, prone to rashes" },
        { value: "kapha", text: "Smooth, soft, oily" }
      ]
    },
    {
      id: 3,
      question: "What is your typical appetite?",
      options: [
        { value: "vata", text: "Irregular, variable" },
        { value: "pitta", text: "Strong, regular" },
        { value: "kapha", text: "Steady, slow" }
      ]
    },
    {
      id: 4,
      question: "How do you handle stress?",
      options: [
        { value: "vata", text: "Get anxious, worry" },
        { value: "pitta", text: "Get irritable, angry" },
        { value: "kapha", text: "Remain calm, withdraw" }
      ]
    },
    {
      id: 5,
      question: "What is your sleep pattern?",
      options: [
        { value: "vata", text: "Light, interrupted sleep" },
        { value: "pitta", text: "Moderate, wake up occasionally" },
        { value: "kapha", text: "Deep, heavy sleep" }
      ]
    },
    {
      id: 6,
      question: "How is your digestion?",
      options: [
        { value: "vata", text: "Irregular, gas, bloating" },
        { value: "pitta", text: "Strong, can digest anything" },
        { value: "kapha", text: "Slow, steady" }
      ]
    },
    {
      id: 7,
      question: "What is your energy level throughout the day?",
      options: [
        { value: "vata", text: "Variable, bursts of energy" },
        { value: "pitta", text: "High, consistent" },
        { value: "kapha", text: "Steady, sluggish mornings" }
      ]
    },
    {
      id: 8,
      question: "How do you handle cold weather?",
      options: [
        { value: "vata", text: "Very sensitive to cold" },
        { value: "pitta", text: "Tolerate cold well" },
        { value: "kapha", text: "Feel comfortable" }
      ]
    },
    {
      id: 9,
      question: "What is your typical body temperature?",
      options: [
        { value: "vata", text: "Cold hands and feet" },
        { value: "pitta", text: "Warm, run hot" },
        { value: "kapha", text: "Normal, slightly cool" }
      ]
    },
    {
      id: 10,
      question: "How is your memory?",
      options: [
        { value: "vata", text: "Quick to learn, quick to forget" },
        { value: "pitta", text: "Sharp, focused memory" },
        { value: "kapha", text: "Slow to learn, excellent retention" }
      ]
    },
    {
      id: 11,
      question: "What is your typical mood?",
      options: [
        { value: "vata", text: "Anxious, changeable" },
        { value: "pitta", text: "Intense, goal-oriented" },
        { value: "kapha", text: "Calm, content" }
      ]
    },
    {
      id: 12,
      question: "How is your speech?",
      options: [
        { value: "vata", text: "Fast, talkative" },
        { value: "pitta", text: "Clear, sharp" },
        { value: "kapha", text: "Slow, deliberate" }
      ]
    },
    {
      id: 13,
      question: "What type of climate do you prefer?",
      options: [
        { value: "vata", text: "Warm, humid" },
        { value: "pitta", text: "Cool, moderate" },
        { value: "kapha", text: "Warm, dry" }
      ]
    },
    {
      id: 14,
      question: "How is your hair?",
      options: [
        { value: "vata", text: "Dry, brittle, thin" },
        { value: "pitta", text: "Fine, early graying" },
        { value: "kapha", text: "Thick, oily, wavy" }
      ]
    },
    {
      id: 15,
      question: "What is your exercise preference?",
      options: [
        { value: "vata", text: "Light, flexibility-focused" },
        { value: "pitta", text: "Intense, competitive" },
        { value: "kapha", text: "Moderate, consistent" }
      ]
    },
    {
      id: 16,
      question: "How is your thirst?",
      options: [
        { value: "vata", text: "Variable, sometimes forget to drink" },
        { value: "pitta", text: "Frequent, strong thirst" },
        { value: "kapha", text: "Steady, moderate" }
      ]
    },
    {
      id: 17,
      question: "What is your typical weight pattern?",
      options: [
        { value: "vata", text: "Underweight, hard to gain" },
        { value: "pitta", text: "Medium, maintains weight" },
        { value: "kapha", text: "Overweight, hard to lose" }
      ]
    },
    {
      id: 18,
      question: "How is your eyesight?",
      options: [
        { value: "vata", text: "Variable, dry eyes" },
        { value: "pitta", text: "Sharp, sensitive to light" },
        { value: "kapha", text: "Steady, good" }
      ]
    },
    {
      id: 19,
      question: "What is your typical eating speed?",
      options: [
        { value: "vata", text: "Irregular, sometimes fast" },
        { value: "pitta", text: "Fast, strong appetite" },
        { value: "kapha", text: "Slow, enjoys food" }
      ]
    },
    {
      id: 20,
      question: "How do you handle change?",
      options: [
        { value: "vata", text: "Anxious, adapts quickly" },
        { value: "pitta", text: "Organized, plans ahead" },
        { value: "kapha", text: "Resistant, prefers routine" }
      ]
    },
    {
      id: 21,
      question: "What is your typical sweating pattern?",
      options: [
        { value: "vata", text: "Minimal sweating" },
        { value: "pitta", text: "Profuse sweating" },
        { value: "kapha", text: "Moderate sweating" }
      ]
    },
    {
      id: 22,
      question: "How is your immune system?",
      options: [
        { value: "vata", text: "Variable, catches colds easily" },
        { value: "pitta", text: "Strong, quick recovery" },
        { value: "kapha", text: "Stable, rarely sick" }
      ]
    },
    {
      id: 23,
      question: "What is your typical posture?",
      options: [
        { value: "vata", text: "Slender, variable posture" },
        { value: "pitta", text: "Proportional, good posture" },
        { value: "kapha", text: "Large, steady posture" }
      ]
    },
    {
      id: 24,
      question: "How is your bowel movement?",
      options: [
        { value: "vata", text: "Irregular, sometimes constipated" },
        { value: "pitta", text: "Regular, sometimes loose" },
        { value: "kapha", text: "Regular, well-formed" }
      ]
    },
    {
      id: 25,
      question: "What is your typical decision-making style?",
      options: [
        { value: "vata", text: "Quick, changeable" },
        { value: "pitta", text: "Fast, determined" },
        { value: "kapha", text: "Slow, careful" }
      ]
    },
    {
      id: 26,
      question: "How is your circulation?",
      options: [
        { value: "vata", text: "Poor, cold extremities" },
        { value: "pitta", text: "Good, warm body" },
        { value: "kapha", text: "Steady, moderate" }
      ]
    },
    {
      id: 27,
      question: "What is your typical voice?",
      options: [
        { value: "vata", text: "Thin, high-pitched" },
        { value: "pitta", text: "Clear, sharp" },
        { value: "kapha", text: "Deep, pleasant" }
      ]
    },
    {
      id: 28,
      question: "How do you handle physical activity?",
      options: [
        { value: "vata", text: "Variable energy, tires easily" },
        { value: "pitta", text: "High endurance, competitive" },
        { value: "kapha", text: "Steady, good stamina" }
      ]
    },
    {
      id: 29,
      question: "What is your typical pulse?",
      options: [
        { value: "vata", text: "Thready, irregular" },
        { value: "pitta", text: "Strong, bounding" },
        { value: "kapha", text: "Slow, steady" }
      ]
    },
    {
      id: 30,
      question: "Overall, which description fits you best?",
      options: [
        { value: "vata", text: "Creative, energetic, changeable" },
        { value: "pitta", text: "Intelligent, focused, intense" },
        { value: "kapha", text: "Calm, stable, nurturing" }
      ]
    }
  ];

  res.json({ questions });
});

// Submit Prakarti quiz
router.post('/quiz', auth, async (req, res) => {
  try {
    const { answers } = req.body;

    // Calculate dosha scores
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    
    answers.forEach(answer => {
      if (scores.hasOwnProperty(answer)) {
        scores[answer]++;
      }
    });

    // Determine Prakriti type
    let prakritiType = '';
    const maxScore = Math.max(scores.vata, scores.pitta, scores.kapha);
    const maxDoshas = [];

    if (scores.vata === maxScore) maxDoshas.push('Vata');
    if (scores.pitta === maxScore) maxDoshas.push('Pitta');
    if (scores.kapha === maxScore) maxDoshas.push('Kapha');

    if (maxDoshas.length === 1) {
      prakritiType = maxDoshas[0];
    } else if (maxDoshas.length === 2) {
      prakritiType = maxDoshas.join('-');
    } else {
      prakritiType = 'Tridosha';
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { prakritiType } },
      { new: true }
    ).select('-password');

    res.json({
      prakritiType,
      scores,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

