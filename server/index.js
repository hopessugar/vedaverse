const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/prakarti', require('./routes/prakarti'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/plans', require('./routes/plans'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/yoga', require('./routes/yoga'));
app.use('/api/herbs', require('./routes/herbs'));

// Serve static files in production (if frontend is served from same server)
// Must be after API routes
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vedaVerse', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.log('⚠️ MongoDB Error:', err.message);
  console.log('⚠️ Server will continue without database. Some features may not work.');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ API available at http://localhost:${PORT}/api`);
});

