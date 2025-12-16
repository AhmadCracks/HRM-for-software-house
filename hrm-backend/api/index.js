// Vercel serverless function entry point
let app;

try {
  app = require('../server');
  console.log('✅ Server module loaded successfully');
} catch (error) {
  console.error('❌ CRITICAL ERROR: Failed to load server.js', error);
  // We can't use app here, so we export a simple error handler
  module.exports = (req, res) => {
    res.status(500).json({
      error: 'Server Startup Failed',
      details: error.message,
      stack: error.stack
    });
  };
}

// Export handler for Vercel
module.exports = (req, res) => {
  if (app) {
    return app(req, res);
  }
  // Fallback if app failed to load (though catch block above usually handles it)
  res.status(500).send('Server failed to initialize');
};

