require("dotenv").config();
const { Pool } = require("pg");
console.log("DB_PASSWORD:", typeof process.env.DB_PASSWORD);
module.exports = new Pool({
  host: "localhost", 
  user: process.env.DB_USER,
  database: "inventory",
  password: process.env.DB_PASSWORD,
  port: 5432 
});
