const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbName = process.env.DB_NAME || 'b10_40637242_hrm_sys';
const dbUser = process.env.DB_USER || 'b10_40637242';
const dbPassword = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'd6ky275f';
const dbHost = process.env.DB_HOST || 'sql100.byethost10.com';
const dbPort = process.env.DB_PORT || 3306;
const dbTimeout = Number(process.env.DB_CONNECT_TIMEOUT || 20000);
const skipDbCreate = process.env.DB_SKIP_CREATE === 'true';

// Function to create database if it doesn't exist (can be skipped on hosted DBs)
const ensureDatabaseExists = async () => {
  if (skipDbCreate) {
    return true;
  }
  try {
    // Connect to MySQL without selecting a database
    const connectionConfig = {
      host: dbHost,
      port: dbPort,
      user: dbUser,
      // Ensure the initial connection does not hang forever
      connectTimeout: dbTimeout
    };
    // Only add password if it's not empty
    if (dbPassword && dbPassword.trim() !== '') {
      connectionConfig.password = dbPassword;
    }
    const connection = await mysql.createConnection(connectionConfig);

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.end();
    return true;

  } catch (error) {
    console.warn('⚠️  Warning: Could not check/create database. Assuming it exists or user has no permission to create.', error.message);
    // Return true to allow connection attempt to proceed, as the DB likely exists
    return true;
  }
};

// Sequelize configuration
const sequelizeConfig = {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
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
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    connectTimeout: 60000 // 60 seconds
  }
};

// Only pass password if it's not empty, otherwise pass undefined
const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword && dbPassword.trim() !== '' ? dbPassword : undefined,
  sequelizeConfig
);

// Test connection with auto-create database
const testConnection = async () => {
  try {
    // First ensure database exists
    const dbExists = await ensureDatabaseExists();
    if (!dbExists) {
      console.error('❌ Failed to create/verify database');
      return false;
    }

    // Then test connection
    await sequelize.authenticate();
    console.log('✅ MySQL connection established successfully.');
    console.log(`📊 Connected to database: ${dbName}`);
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to MySQL database:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check database credentials in .env file');
    console.error('   2. Verify MySQL user has proper privileges');
    console.error('   3. Check if ByteHost database is accessible');
    return false;
  }
};

module.exports = { sequelize, testConnection, ensureDatabaseExists };

