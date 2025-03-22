require("dotenv").config();
const mysql = require("mysql2");

const isAWS = process.env.USE_AWS === "true"; // Switch between AWS and Local

const db = mysql.createConnection({
  host: isAWS ? process.env.AWS_DB_HOST : process.env.DB_HOST,
  user: isAWS ? process.env.AWS_DB_USER : process.env.DB_USER,
  password: isAWS ? process.env.AWS_DB_PASS : process.env.DB_PASS,
  database: isAWS ? process.env.AWS_DB_NAME : process.env.DB_NAME,
  port: isAWS ? process.env.AWS_DB_PORT : process.env.DB_PORT, // ✅ Add port
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log(`✅ Connected to ${isAWS ? "AWS" : "Local"} MySQL Database`);
  }
});

module.exports = db;
