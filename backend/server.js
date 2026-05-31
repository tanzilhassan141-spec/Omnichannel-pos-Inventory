require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');



const app = express();

// Middleware to parse JSON payloads
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

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