// Load environment variables from .env file FIRST
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const profileRoutes = require('./src/routes/profile');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully! ✨'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import and use routes
const authRoutes = require('./src/routes/authRoutes');

// Basic Route for testing (keep this)
app.get('/', (req, res) => {
  res.send('Kedjom TV Backend API is running! 🚀');
});

// Use Auth Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});