// dotenv dependency to parse env varaibles
const dotenv = require('dotenv');
dotenv.config();

// pgp dependency for connecting PostgreSQL
const pgp = require('pg-promise')();
const connection = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE_NAME,
    port: process.env.DB_DBPORT,
    
}
const db = pgp(connection);

module.exports = db;