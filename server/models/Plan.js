const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  diseases: [{
    type: String
  }],
  prakritiType: {
    type: String
  },
  yogaPoses: [{
    name: String,
    sanskritName: String,
    description: String,
    instructions: [String],
    benefits: [String],
    whyAyurvedic: String,
    duration: String,
    image: String
  }],
  dietPlan: {
    foodsToEat: [{
      name: String,
      reason: String,
      timing: String
    }],
    foodsToAvoid: [{
      name: String,
      reason: String
    }],
    mealSchedule: [{
      meal: String,
      time: String,
      suggestions: [String]
    }]
  },
  lifestyleTips: [{
    tip: String,
    reason: String,
    category: String
  }],
  dosAndDonts: {
    dos: [{
      action: String,
      reason: String
    }],
    donts: [{
      action: String,
      reason: String
    }]
  },
  herbalRecommendations: [{
    herbName: String,
    benefits: [String],
    usage: String,
    precautions: String
  }],
  generatedBy: {
    type: String,
    default: 'AI'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);

