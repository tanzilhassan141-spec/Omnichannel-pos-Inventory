require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON payloads
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Basic Route for testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'POS System Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});