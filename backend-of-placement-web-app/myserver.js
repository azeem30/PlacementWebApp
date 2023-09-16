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
    password: 'Azeem@123',
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
});
app.post('/student_login', (req, res)=>{
    try{
        const {email, password} = req.body.loginStudentData;
        const selectQuery = `SELECT * FROM students where email=?`;
        db.query(selectQuery, [email], (error, results)=>{
            if(error){
                console.error('Error querying MySQL:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else{
                if(results.length === 0){
                    res.status(401).json({ error: 'Authentication failed. Invalid credentials.' });
                }
                else{
                    const studentInfo = results[0];
                    if(studentInfo.password === password){
                        res.status(200).json({ message: 'Authentication successful', studentInfo });
                    }
                    else{
                        res.status(401).json({ error: 'Authentication failed. Invalid credentials.' });
                    }
                }
            }
        })
    }catch (error) {
        console.error('Error handling login request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.listen(port, ()=>{console.log('Listening on port', port)});