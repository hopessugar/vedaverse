const mongoose = require('mongoose');

const herbSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  hindiName: {
    type: String,
    default: ''
  },
  benefits: [String],
  usage: {
    type: String,
    default: ''
  },
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

module.exports = mongoose.model('Herb', herbSchema);

