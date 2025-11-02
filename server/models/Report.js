const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['Lab Report', 'Medical Report', 'Prescription', 'Other'],
    default: 'Lab Report'
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  analysis: {
    findings: [String],
    ayurvedicDiagnosis: String,
    recommendations: [String],
    remedies: [{
      herb: String,
      dosage: String,
      duration: String,
      reason: String
    }]
  },
  analyzedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);

