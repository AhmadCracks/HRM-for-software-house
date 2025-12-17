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
    logging: false, // Set to console.log to see SQL queries
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
  // Fallback for local development without DATABASE_URL (e.g. SQLite for testing)
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

const testConnection = async () => {
  try {
    console.log('\n🔌 Attempting database connection...');
    await sequelize.authenticate();
    console.log('✅ Connection established successfully to Supabase/PostgreSQL.');
    return true;
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
