const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abc123",
  database: "placementwebapp"
});

con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.post("/student_signup", (req, res) => {
  let data = [
    req.body.roll_no,
    req.body.email,
    req.body.name,
    req.body.password,
    req.body.department_id,
    req.body.semester,
    req.body.sgpi,
    req.body.cgpi
  ];
  let sql = "INSERT INTO students (roll_no, email, name, password, department_id, semester, sgpi, cgpi) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  con.query(sql, data, (err, res) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});

app.listen(9999, () => {
  console.log("Ready to serve @ 9999");
});
