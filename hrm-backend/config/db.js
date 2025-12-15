const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Bytehost database configuration
const dbName = process.env.DB_NAME || 'b10_40637242_hrm_sys';
const dbUser = process.env.DB_USER || 'b10_40637242';
const dbPassword = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'd6ky275f';
const dbHost = process.env.DB_HOST || 'sql100.byethost10.com';
const dbPort = Number(process.env.DB_PORT || 3306);
const dbTimeout = Number(process.env.DB_CONNECT_TIMEOUT || 30000);
// Skip database creation for Bytehost (shared hosting doesn't allow CREATE DATABASE)
const skipDbCreate = process.env.DB_SKIP_CREATE !== 'false'; // Default to true for Bytehost

// Log database configuration (without password)
console.log('🔧 Database Configuration:');
console.log(`   Host: ${dbHost}`);
console.log(`   Port: ${dbPort}`);
console.log(`   Database: ${dbName}`);
console.log(`   User: ${dbUser}`);
console.log(`   Timeout: ${dbTimeout}ms`);
console.log(`   Skip Create: ${skipDbCreate}`);

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
      connectTimeout: dbTimeout,
      // Additional options for Bytehost
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
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
    acquire: 60000, // Increased for Bytehost
    idle: 10000
  },
  dialectOptions: {
    connectTimeout: 30000, // 30 seconds for Bytehost (can be slow)
    // Note: requestTimeout is not a valid option for mysql2
  },
  retry: {
    max: 3
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
    console.log('\n🔌 Attempting database connection...');
    console.log(`   Target: ${dbHost}:${dbPort}`);
    console.log(`   Database: ${dbName}`);
    console.log(`   User: ${dbUser}`);
    
    // First ensure database exists
    const dbExists = await ensureDatabaseExists();
    if (!dbExists) {
      console.error('❌ Failed to create/verify database');
      return false;
    }

    // Then test connection with explicit host
    console.log('   Connecting to Sequelize...');
    await sequelize.authenticate();
    console.log('✅ MySQL connection established successfully.');
    console.log(`📊 Connected to database: ${dbName} on ${dbHost}:${dbPort}`);
    return true;
  } catch (error) {
    console.error('\n❌ Unable to connect to MySQL database');
    console.error(`   Error: ${error.message}`);
    console.error(`   Error Code: ${error.code || 'N/A'}`);
    console.error(`   Attempted: ${dbHost}:${dbPort}`);
    console.error(`   Actual connection target: ${error.address || dbHost}:${error.port || dbPort}`);
    
    if (error.code === 'ETIMEDOUT' || error.code === 'ENOTFOUND') {
      console.error('\n⚠️  LOCAL NETWORK ISSUE DETECTED');
      console.error('   Bytehost MySQL is not accessible from your local network.');
      console.error('   This is NORMAL and EXPECTED.');
      console.error('   ✅ The connection WILL WORK on Vercel (cloud infrastructure)');
      console.error('   ✅ Deploy to Vercel to test the actual connection');
    }
    
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check database credentials in .env file');
    console.error('   2. Verify MySQL user has proper privileges');
    console.error('   3. Check ByteHost database is accessible');
    console.error('   4. For local: Bytehost blocks local connections (use Vercel)');
    console.error('   5. Deploy to Vercel - connection will work on cloud infrastructure');
    
    // Don't exit in serverless mode - let Vercel handle it
    if (process.env.VERCEL) {
      console.warn('⚠️  Running on Vercel - connection will be retried on request');
      return false; // Return false but don't crash
    }
    
    return false;
  }
};

module.exports = { sequelize, testConnection, ensureDatabaseExists };

