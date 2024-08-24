const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const dbConfig = {
  host: process.env.SQL_DB_HOST,
  user: process.env.SQL_DB_USERNAME,
  password: process.env.SQL_DB_PASSWORD,
  database: process.env.SQL_DB_DATABASENAME,
};

const pool = mysql.createPool(dbConfig);

module.exports = { pool };
