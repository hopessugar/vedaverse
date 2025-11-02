const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: null
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  bio: {
    type: String,
    default: ''
  },
  experience: {
    type: Number,
    default: 0
  },
  consultationFee: {
    type: Number,
    required: true
  },
  availableSlots: [{
    day: String,
    times: [String]
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);

