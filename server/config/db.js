const mssql = require('mssql');
require('dotenv').config();


// Database configuration
const dbConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    trustedConnection: process.env.DB_TRUSTED_CONNECTION === 'true' || true,
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' || true,
    encrypt: process.env.DB_ENCRYPT === 'true' || true,
  },
}

const pool = new mssql.ConnectionPool(dbConfig);

module.exports = pool