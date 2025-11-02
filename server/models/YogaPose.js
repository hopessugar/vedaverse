const mongoose = require('mongoose');

const yogaPoseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sanskritName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  instructions: [String],
  benefits: [String],
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'General'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('YogaPose', yogaPoseSchema);

