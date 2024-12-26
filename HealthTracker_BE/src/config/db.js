const express = require("express");
const { Pool } = require('pg');
require('dotenv').config();

const router = express.Router();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

// router.get('/test', async (req, res) => {
//     try {
//       await pool.query('SELECT 1;'); // Simple query to check connection
//       res.send('Database connected successfully'); 
//     } catch (err) {
//       console.error('Database connection error:', err);
//       res.status(500).send('Database connection failed');
//     }
// });

module.exports = pool;