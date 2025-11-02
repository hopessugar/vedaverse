const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['Ayurveda Consultation', 'Yoga & Pranayama Session', 'Diet & Lifestyle Coaching', 'Mental Wellness Support']
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 30
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  },
  price: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Refunded'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);

