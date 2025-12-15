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
  'https://hrm-for-softwarehousemanagementsystem-68d1t4gbo.vercel.app',
  'https://hrm-for-softwarehousemanagementsystem.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow if in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    // Allow if FRONTEND_URL matches (for dynamic Vercel URLs)
    if (process.env.FRONTEND_URL) {
      const frontendUrl = process.env.FRONTEND_URL.replace('https://', '').replace('http://', '');
      if (origin.includes(frontendUrl)) {
        return callback(null, true);
      }
    }
    
    // Allow in development
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // Allow Vercel preview deployments (contains .vercel.app)
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    
    // Log blocked origin for debugging
    console.log('⚠️  CORS blocked origin:', origin);
    console.log('✅ Allowed origins:', allowedOrigins);
    callback(new Error('Not allowed by CORS'));
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

// Lazy database connection for Vercel serverless
let dbConnected = false;
let seedRun = false;
const connectDatabase = async () => {
  if (dbConnected) return true;
  
  try {
    const { testConnection } = require('./config/db');
    const isConnected = await testConnection();
    if (isConnected) {
      dbConnected = true;
      // Run seed script to ensure users exist (only once, and only in production)
      if (!seedRun && process.env.RUN_SEED !== 'false') {
        seedRun = true;
        // Run seed asynchronously to not block requests
        setImmediate(async () => {
          try {
            const { sequelize } = require('./config/db');
            const { User, Employee } = require('./models');
            await sequelize.sync({ alter: false });
            
            // Create admin if doesn't exist
            const [adminUser] = await User.findOrCreate({
              where: { email: 'admin@hrm.com' },
              defaults: {
                email: 'admin@hrm.com',
                password: 'admin123',
                role: 'admin',
                is_active: true
              }
            });
            console.log('✅ Admin user ready:', adminUser.email);
            
            // Create manager if doesn't exist
            const [managerUser] = await User.findOrCreate({
              where: { email: 'manager@hrm.com' },
              defaults: {
                email: 'manager@hrm.com',
                password: 'manager123',
                role: 'manager',
                is_active: true
              }
            });
            console.log('✅ Manager user ready:', managerUser.email);
            
            // Create employee if doesn't exist
            const [employeeUser] = await User.findOrCreate({
              where: { email: 'employee1@hrm.com' },
              defaults: {
                email: 'employee1@hrm.com',
                password: 'employee123',
                role: 'employee',
                is_active: true
              }
            });
            console.log('✅ Employee user ready:', employeeUser.email);
            
            // Create employee record if doesn't exist
            await Employee.findOrCreate({
              where: { user_id: employeeUser.id },
              defaults: {
                user_id: employeeUser.id,
                employee_id: 'EMP-001',
                first_name: 'John',
                last_name: 'Doe',
                phone: '1234567890',
                department: 'Development',
                position: 'Software Developer',
                joining_date: '2024-01-15',
                salary: 50000
              }
            });
            
            console.log('✅ Default users seeded successfully');
          } catch (seedError) {
            console.warn('⚠️  Seed warning (users may already exist):', seedError.message);
          }
        });
      }
    }
    return isConnected;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    return false;
  }
};

// Middleware to ensure DB is connected before handling requests
app.use(async (req, res, next) => {
  // Skip DB connection for health check
  if (req.path === '/api/health' || req.path === '/') {
    return next();
  }
  
  // Try to connect if not connected
  if (!dbConnected) {
    const connected = await connectDatabase();
    if (!connected && process.env.VERCEL) {
      // On Vercel, don't block requests - connection will be retried
      console.warn('⚠️  Database not connected, but continuing (Vercel serverless mode)');
    }
  }
  next();
});

// Start Server and Connect DB (only for local development)
if (require.main === module) {
  const startServer = async () => {
    try {
      const isConnected = await connectDatabase();

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

// Export for Vercel serverless - Database connection will be lazy (connected on first request)
module.exports = app;

