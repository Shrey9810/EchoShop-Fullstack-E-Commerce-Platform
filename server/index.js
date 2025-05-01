// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Check for MongoDB URI
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env file');
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:8080', // Adjust this if your frontend runs elsewhere
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4 only
})
.then(() => {
  console.log('Connected to MongoDB successfully');

  mongoose.connection.once('open', async () => {
    try {
      await mongoose.connection.db.collection('users').createIndex({ email: 1 }, { unique: true });
      console.log('📌 User email index ensured');
    } catch (error) {
      console.error('⚠️ Error creating indexes:', error);
    }
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  console.log('Server will continue running in offline mode');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation Error', errors: err.errors });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate key error',
      field: Object.keys(err.keyPattern)[0],
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});