const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const app = express();
const port = 9999;
app.use(
    session({
        secret: `It's a secret`,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(cors());
app.use(express.json());
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Azeem@123',
    database: 'placementwebapp'
});

app.post('/student_signup', (req, res)=>{
    try{
    const {roll_no, email, name, password, department_id, semester, sgpi, cgpi} = req.body.studentData;
    const insertQuery = "INSERT INTO students (`roll_no`, `email`, `name`, `password`, `department_id`, `semester`, `sgpi`, `cgpi`) values (?, ?, ?, ?, ?, ?, ?, ?)";
    const aptitudeAccessQuery = "INSERT INTO subject_access (`user_id`, `subject_id`) values (?, ?)";
    const sgpiJSON = JSON.stringify(sgpi);
    const cgpiJSON = JSON.stringify(cgpi);
    const values = [roll_no, email, name, password, department_id, semester, sgpiJSON, cgpiJSON];
    const aptitudeAccessValues = [email, 40];
    db.query(insertQuery, values, (err, result)=>{
        if(err){
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else{
            res.status(200).json({ message: 'Data inserted successfully'});
        }
    });
    db.query(aptitudeAccessQuery, aptitudeAccessValues, (err, result)=>{
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

app.post('/teacher_signup', (req, res)=>{
    try{
    const {roll_no, email, name, password, department_id} = req.body.teacherData;
    const insertQuery = "INSERT INTO teachers (`roll_no`, `email`, `name`, `password`, `department_id`) values (?, ?, ?, ?, ?)";
    const aptitudeAccessQuery = "INSERT INTO subject_access (`user_id`, `subject_id`) values (?, ?)";
    const values = [roll_no, email, name, password, department_id];
    const aptitudeAccessValues = [email, 40];
    db.query(insertQuery, values, (err, result)=>{
        if(err){
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else{
            res.status(200).json({ message: 'Data inserted successfully'});
        }
    });
    db.query(aptitudeAccessQuery, aptitudeAccessValues, (err, result)=>{
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

app.post('/teacher_login', (req, res)=>{
    try{
        const {email, password} = req.body.loginTeacherData;
        const selectQuery = `SELECT * FROM teachers where email=?`;
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
                    const teacherInfo = results[0];
                    if(teacherInfo.password === password){
                        res.status(200).json({teacherInfo});
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

app.post('/get_student_details', (req, res)=>{
    try{
        const {roll_no, email, name, password, department_id, semester, sgpi, cgpi} = req.body.si;
        const selectQuery = `SELECT s.*, d.department_name
        FROM students s
        INNER JOIN department d ON s.department_id = d.department_id
        WHERE s.email = ?`;
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
                    const studentProfileDetails = results[0];
                    res.status(200).json({studentProfileDetails});
                }
            }
        })
    }
    catch(error){
        console.error('Error handling login request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/get_teacher_details', (req, res)=>{
    try{
        const {roll_no, email, name, password, department_id} = req.body.ti;
        const selectQuery = `SELECT t.*, d.department_name
        FROM teachers t
        INNER JOIN department d ON t.department_id = d.department_id
        WHERE t.email = ?`;
        db.query(selectQuery,[email], (error, results)=>{
            if(error){
                console.error('Error querying MySQL:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else{
                if(results.length === 0){
                    res.status(401).json({ error: 'Authentication failed. Invalid credentials.' });
                }
                else{
                    const teacherProfileDetails = results[0];
                    res.status(200).json({teacherProfileDetails});
                }
            }
        })
    }catch(error){
        console.error('Error handling login request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/get_teacher_subjects', (req, res)=>{
    const {roll_no, email, name, password, department_id} = req.body.ti;
    const selectQuery = `SELECT subject_id, subject_name from (SELECT s.subject_id, s.subject_name
    FROM subjects s 
    WHERE s.department_id = ? 
    UNION SELECT sa.subject_id, s.subject_name
    FROM subject_access sa
    JOIN subjects s ON sa.subject_id = s.subject_id
    JOIN teachers t ON sa.user_id = t.email
    WHERE t.email = ? AND t.department_id = ?) as combined_subjects;`
    db.query(selectQuery, [department_id, email, department_id], (error, results)=>{
        if(error){
            console.error('Error querying MySQL:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else{
            if(results.length === 0){
                res.status(401).json({ error: 'Authentication failed. Invalid credentials.' });
            }
            else{
                const teacherSubjectsList = results;
                res.status(200).json({teacherSubjectsList});
            }
        }
    });
});

app.post('/schedule_test', (req, res)=>{
    try{
        const {id, title, marks, duration, difficulty, subject_id, teacher_email} = req.body.testDetails;
        const insertQuery = 'INSERT INTO tests (`id`, `title`, `marks`, `duration`, `difficulty`, `subject_id`, `teacher_email`) values (?, ?, ?, ?, ?, ?, ?)';
        const values = [id, title, marks, duration, difficulty, subject_id, teacher_email];
        db.query(insertQuery, values, (error, results)=>{
            if(error){
                console.error('Error querying MySQL:', error);
                res.status(500).json({error:     'Internal Server Error'});
            }
            else{
                res.status(200).json({message: 'Data inserted successfully!'});
            }
        })
    }catch(error){
        console.error('Error handling form submission');
        res.status(500).json({error: 'Internal Server Error'});
    }
});
 
app.post('/get_pending_tests', (req, res)=>{
    try{
        const {roll_no, email, name, password, department_id} = req.body.si;
        const selectQuery = `SELECT t.id AS test_id,
        t.title AS test_title,
        t.marks AS test_marks,
        t.duration AS test_duration,
        t.difficulty AS test_difficulty,
        t.teacher_email AS teacher_email,
        s.subject_name AS subject_name
        FROM tests t
        JOIN subjects s ON t.subject_id = s.subject_id
        JOIN students stu ON s.department_id = stu.department_id
        WHERE stu.department_id = ?
        UNION 
        SELECT t.id AS test_id,
        t.title AS test_title,
        t.marks AS test_marks,
        t.duration AS test_duration,
        t.difficulty AS test_difficulty,
        t.teacher_email AS teacher_email,
        s.subject_name AS subject_name
        FROM tests t
        JOIN subjects s ON t.subject_id = s.subject_id
        JOIN subject_access sa ON t.subject_id = sa.subject_id
        WHERE sa.user_id = ?`;
        db.query(selectQuery,[department_id, email], (error, results)=>{
            if(error){
                console.error('Error querying MySQL:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else{
                if(results.length === 0){
                    res.status(401).json({ error: 'Authentication failed. Invalid credentials.' });
                }
                else{
                    const pendingTestDetails = results;
                    res.status(200).json({pendingTestDetails});
                }
            }
        })
    }catch(error){
        console.error('Error handling login request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/questions', (req, res)=>{
    try{
        const {test_id, test_title, test_marks, test_duration, test_difficulty, subject_name} = req.body.test;
        if(test_difficulty==='Combined'){
        const selectQuery = `SELECT * FROM questions_dataset WHERE subject_name=? LIMIT 30`;
        const values=[subject_name];
        db.query(selectQuery, values, (error, results)=>{
            if(error){
                console.error('Error querying MySQL:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else{
                if(results.length === 0){
                    res.status(401).json({ error: 'No match found' });
                }
                else{
                    const questions = results;
                    res.status(200).json({questions});
                }
            }
        });
        }
        else{
        const selectQuery = `SELECT * FROM questions_dataset WHERE question_difficulty=? AND subject_name=? LIMIT 30`;
        const values=[test_difficulty, subject_name];
        db.query(selectQuery, values, (error, results)=>{
            if(error){
                console.error('Error querying MySQL:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else{
                if(results.length === 0){
                    res.status(401).json({ error: 'No match found' });
                }
                else{
                    const questions = results;
                    res.status(200).json({questions});
                }
            }
        });
    }
    }catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/submit_response', (req, res)=>{
    try{
        const {response_id, response_data, marks_scored, total_marks, percentage, student_id, teacher_id} = req.body.testResponse;
        const insertQuery = `INSERT INTO test_responses (id, data, marks_scored, total_marks, percentage, student_id, teacher_id)
        values (?, ?, ?, ?, ?, ?, ?);`
        const values = [response_id, JSON.stringify(response_data), marks_scored, total_marks, percentage, student_id, teacher_id];
        db.query(insertQuery, values, (error, results)=>{
            if(error){
                console.error('Error querying MySQL:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else{
                res.status(200).json({ message: 'Response submitted successfully!'});
            }
        })
    }catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, ()=>{console.log('Listening on port', port)});