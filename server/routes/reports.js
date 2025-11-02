const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const Report = require('../models/Report');
const { analyzeReport } = require('../services/aiService');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Upload and analyze report
router.post('/upload', auth, upload.single('report'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // In production, upload to cloud storage (AWS S3, Cloudinary, etc.)
    // For now, we'll store file info and analyze it
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;

    // Analyze report using AI
    const analysis = await analyzeReport(fileBuffer, fileName, fileType);

    // Save report
    const report = new Report({
      user: req.user.id,
      type: req.body.type || 'Lab Report',
      fileName: fileName,
      fileUrl: `uploads/${req.user.id}/${fileName}`, // In production, use actual URL
      analysis: analysis
    });

    await report.save();

    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's reports
router.get('/', auth, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific report
router.get('/:id', auth, async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

