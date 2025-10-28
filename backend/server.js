const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cloudinary = require("./cloudinary.js");


dotenv.config();

// Start express app
const app = express();

// Middleware
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Allow requests only from the frontend dev origin (adjust if your frontend runs elsewhere)
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

// Static folder for uploads - serve uploaded images from absolute path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ Error connecting to MongoDB:', error));

// Base route
app.get('/', (req, res) => {
  res.send('🌸 Welcome to the Flower Delivery API! Use /api/flowers to manage flowers.');
});

// Routes
app.use('/api/flowers', require('./routes/flowerRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found 🚫" });
});

// Global error handler - returns JSON for unhandled errors and logs stack
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err && err.stack ? err.stack : err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
