const express = require('express');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Azeem@123', 
    database: 'placementwebapp' 
})

db.connect((message)=>{
    if(message){
        console.log('Error Connecting to MySQL:', message);
    }
    else{
        console.log('Connected to MySQL');
    }
});

app.post('/student_signup', (req, res)=> {
    try{
        const {roll_no, email, name, password, department_id, semester, sgpi, cgpi} = req.body;
        const insertQuery = `INSERT INTO student (roll_no, email, name, password, department_id, semester, sgpi, cgpi)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [roll_no, email, name, password, department_id, semester, parseFloat(sgpi), parseFloat(cgpi)];
        db.query(insertQuery, values, (err, result)=>{
            if(err){
                console.error('Error inserting data into MySQL:', err);
                res.status(500).json({error: 'Internal Server Error'});
            }
            else{
                res.status(200).json({message: 'Data inserted successfully'});
            }
        })
    }
    catch(error){
        console.error('Error handling form submission:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

app.listen(port, ()=>{
    console.log('Server is running on port: ', port);
})
