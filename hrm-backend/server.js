const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import Routes
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const recruitmentRoutes = require('./routes/recruitmentRoutes');

// Middleware - CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://hrm-frontendd.vercel.app',
  'https://hrm-frontend-lac.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes Setup
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/recruitment', recruitmentRoutes);

// Basic Route to check if server is running
app.get('/', (req, res) => {
  res.json({ 
    message: 'API is running...',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware (must be after routes)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message,
    status: 'error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    status: 'error'
  });
});

// Start Server and Connect DB (only for local development)
if (require.main === module) {
  const startServer = async () => {
    try {
      const { testConnection } = require('./config/db');
      // 1. Connect to Database
      const isConnected = await testConnection();

      if (isConnected) {
        // 2. Listen on Port
        app.listen(PORT, () => {
          console.log(`\n🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
          console.log(`🔗 http://localhost:${PORT}`);
        });
      } else {
        console.error('❌ Server did not start due to database connection failure.');
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Failed to start server:', error.message);
      process.exit(1);
    }
  };

  startServer();
}

// Export for Vercel serverless - Vercel will use this directly
// Database connection will be lazy (connected on first request)
module.exports = app;

