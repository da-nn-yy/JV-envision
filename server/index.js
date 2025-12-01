const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Import routes
const contactRoutes = require('./routes/contactRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const { initPool, closePool } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/hero-images', require('./routes/images'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'JV Envision Photography API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);

  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Start server
const startServer = async () => {
  try {
    const poolResult = await initPool();

    // If poolResult is the pool object, attach it to the app
    if (poolResult) {
      app.set('db', poolResult);
    }

    if (!poolResult && process.env.NODE_ENV === 'development') {
      console.log('\n⚠️  Server starting in development mode without MySQL database');
      console.log('   Contact form submissions will be logged to console only');
      console.log('   To enable database, configure MySQL credentials in .env file\n');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 CORS enabled for: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    });

    const shutdown = async () => {
      console.log('🔻 Shutting down server...');
      await closePool();
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (error) {
    // Only exit if it's a critical error in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Failed to start server:', error.message || error);
      process.exit(1);
    } else {
      // In development, try to start anyway
      console.warn('⚠️  Database connection failed, but starting server in development mode');
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT} (without database)`);
        console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🌐 CORS enabled for: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
        console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      });
    }
  }
};

startServer();
