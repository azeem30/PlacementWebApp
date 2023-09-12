const app = express();
const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const port = 3306;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Itachi*0126',
  database: 'Placement_app',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Connected to the database');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
