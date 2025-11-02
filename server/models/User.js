const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  prakritiType: {
    type: String,
    enum: ['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Vata-Kapha', 'Pitta-Kapha', 'Tridosha'],
    default: null
  },
  stressLevel: {
    type: String,
    enum: ['Low', 'Moderate', 'High'],
    default: 'Moderate'
  },
  dietaryPreferences: [{
    type: String
  }],
  selectedDiseases: [{
    type: String
  }],
  streak: {
    type: Number,
    default: 0
  },
  lastActiveDate: {
    type: Date
  },
  profilePicture: {
    type: String,
    default: null
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  plans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan'
  }],
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  }]
}, {
  timestamps: true
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

