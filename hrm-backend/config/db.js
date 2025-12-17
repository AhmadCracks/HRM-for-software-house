const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Environment Detection
const isVercel = !!process.env.VERCEL;

// Log configuration
console.log('🔧 Database Configuration (Mode: PostgreSQL/Supabase)');

let sequelize;

// Supabase / PostgreSQL Configuration
if (process.env.DATABASE_URL) {
  console.log('   Using DATABASE_URL from environment.');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectModule: require('pg'), // Required for Vercel
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
    define: {
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  // Fallback Logic
  if (isVercel) {
    // CRITICAL for Vercel: Do NOT start if DB vars are missing.
    // Falling back to SQLite will crash the function because of missing binaries/read-only FS.
    console.error('❌ FATAL: DATABASE_URL is missing in Vercel Environment!');
    console.error('   Please add DATABASE_URL to Vercel Project Settings.');
    // We create a dummy sequelize to prevent immediate crash on export, but 'authenticate' will fail.
    // This allows the server to start so it can serve the error message.
    sequelize = {
      authenticate: async () => { throw new Error('DATABASE_URL is missing on Vercel'); },
      query: async () => { throw new Error('DATABASE_URL is missing on Vercel'); },
      sync: async () => { /* no-op */ }
    };
  } else {
    // Local Development Fallback
    console.log('⚠️  DATABASE_URL not found. Using local SQLite database for development.');
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: path.join(__dirname, '../database.sqlite'),
      logging: false,
      define: {
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    });
  }
}

const testConnection = async () => {
  try {
    console.log('\n🔌 Attempting database connection...');
    if (sequelize.authenticate) {
      await sequelize.authenticate();
      console.log('✅ Connection established successfully.');
      return true;
    }
    return false;
  } catch (error) {
    console.error('\n❌ Unable to connect to database');
    console.error(`   Error: ${error.message}`);
    return false;
  }
};

// Start sync (optional helper, generally handled by server.js or migrations)
// Function to create database is not needed for Supabase as the DB is already created.
const ensureDatabaseExists = async () => {
  return true; // No-op for Postgres
};

module.exports = { sequelize, testConnection, ensureDatabaseExists };
