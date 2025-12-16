// Vercel serverless function entry point
let app;
let startupError;

try {
  app = require('../server');
  console.log('✅ Server module loaded successfully');
} catch (error) {
  console.error('❌ CRITICAL ERROR: Failed to load server.js', error);
  startupError = error;
}

// Export handler for Vercel
module.exports = (req, res) => {
  if (startupError) {
    return res.status(500).json({
      error: 'Server Startup Failed',
      details: startupError.message,
      stack: startupError.stack
    });
  }

  if (app) {
    return app(req, res);
  }

  res.status(500).send('Server failed to initialize (Unknown state)');
};

