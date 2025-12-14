const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { testConnection } = require('./config/db');

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
  '*', // Allow all for debugging if specific domains fail
  process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

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
  res.send('API is running...');
});

// Start Server and Connect DB
const startServer = async () => {
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
};

// Export the app for Vercel Serverless
module.exports = app;

// Only start the server if running directly (local dev or traditional hosting)
if (require.main === module) {
  startServer();
}