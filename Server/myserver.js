const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const app = express();
const port = 9999;
app.use(cors());
app.use(express.json());
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc123',
    database: 'placementwebapp'
})
app.post('/student_signup', (req, res)=>{
    try{
    const {roll_no, email, name, password, department_id, semester, sgpi, cgpi} = req.body.studentData;
    const insertQuery = "INSERT INTO students (`roll_no`, `email`, `name`, `password`, `department_id`, `semester`, `sgpi`, `cgpi`) values (?, ?, ?, ?, ?, ?, ?, ?)";
    const sgpiJSON = JSON.stringify(sgpi);
    const cgpiJSON = JSON.stringify(cgpi);
    const values = [roll_no, email, name, password, department_id, semester, sgpiJSON, cgpiJSON];
    db.query(insertQuery, values, (err, result)=>{
        if(err){
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else{
            res.status(200).json({ message: 'Data inserted successfully'});
        }
    });
    }catch(error){
        console.error('Error handling form submission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.listen(port, ()=>{console.log('Listening on port', port)});