const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config();

// Bytehost database configuration
const dbName = process.env.DB_NAME || 'b10_40637242_hrm_sys';
const dbUser = process.env.DB_USER || 'b10_40637242';
const dbPassword = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'd6ky275f';
const dbHost = process.env.DB_HOST || 'sql100.byethost10.com';
const dbPort = Number(process.env.DB_PORT || 3306);
const dbTimeout = Number(process.env.DB_CONNECT_TIMEOUT || 30000);
// Skip database creation for Bytehost (shared hosting doesn't allow CREATE DATABASE)
const skipDbCreate = process.env.DB_SKIP_CREATE !== 'false';

// Environment Detection
const isVercel = !!process.env.VERCEL;
// Check if we are trying to connect to ByteHost from a non-Vercel environment
const isLocalByteHost = !isVercel && dbHost.includes('byethost');

// Helper to check if we should use SQLite
const useSqlite = isLocalByteHost || process.env.USE_SQLITE === 'true';

// Log configuration
console.log('🔧 Database Configuration (Mode: ' + (useSqlite ? 'Local SQLite' : 'MySQL') + ')');

let sequelize;

if (useSqlite) {
  console.log('⚠️  ByteHost blocks local connections. Using local SQLite database for development.');
  console.log('   (Deploy to Vercel to use the production MySQL database)');

  // SQLite Configuration
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'), // Store in backend root
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
} else {
  // Standard MySQL Configuration
  console.log(`   Host: ${dbHost}`);
  console.log(`   Port: ${dbPort}`);
  console.log(`   Database: ${dbName}`);
  console.log(`   User: ${dbUser}`);

  const sequelizeConfig = {
    host: dbHost,
    port: dbPort,
    dialect: 'mysql',
    dialectModule: require('mysql2'), // Fix for Vercel: Force explicit load of mysql2
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
    dialectOptions: {
      connectTimeout: 30000,
    },
    retry: {
      max: 3
    }
  };

  sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword && dbPassword.trim() !== '' ? dbPassword : undefined,
    sequelizeConfig
  );
}

// Function to create database if it doesn't exist (Skipped for SQLite)
const ensureDatabaseExists = async () => {
  if (useSqlite || skipDbCreate) {
    return true;
  }
  try {
    const connectionConfig = {
      host: dbHost,
      port: dbPort,
      user: dbUser,
      connectTimeout: dbTimeout,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    };
    if (dbPassword && dbPassword.trim() !== '') {
      connectionConfig.password = dbPassword;
    }
    const connection = await mysql.createConnection(connectionConfig);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.end();
    return true;
  } catch (error) {
    console.warn('⚠️  Warning: Could not check/create database.', error.message);
    return true;
  }
};

const testConnection = async () => {
  try {
    console.log('\n🔌 Attempting database connection...');

    // Only verify MySQL availability if not using SQLite
    if (!useSqlite) {
      await ensureDatabaseExists();
    }

    console.log('   Connecting to Sequelize...');
    await sequelize.authenticate();
    console.log('✅ Connection established successfully.');
    if (useSqlite) {
      console.log('📊 Connected to: Local SQLite Database');
    } else {
      console.log(`📊 Connected to database: ${dbName} on ${dbHost}`);
    }

    return true;
  } catch (error) {
    console.error('\n❌ Unable to connect to database');
    console.error(`   Error: ${error.message}`);
    return false;
  }
};

module.exports = { sequelize, testConnection, ensureDatabaseExists };
