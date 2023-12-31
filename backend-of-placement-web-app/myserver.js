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
        saveUninitialized: true
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
app.post('/student_signup', (req, res) => {
    try {
        const { roll_no, email, name, password, department_id, semester, sgpi, cgpi } = req.body.studentData;
        const insertQuery = "INSERT INTO students (`roll_no`, `email`, `name`, `password`, `department_id`, `semester`, `sgpi`, `cgpi`) values (?, ?, ?, ?, ?, ?, ?, ?)";
        const aptitudeAccessQuery = "INSERT INTO subject_access (`user_id`, `subject_id`) values (?, ?)";
        const sgpiJSON = JSON.stringify(sgpi);
        const cgpiJSON = JSON.stringify(cgpi);
        const values = [roll_no, email, name, password, department_id, semester, sgpiJSON, cgpiJSON];
        const aptitudeAccessValues = [email, 40];
        db.beginTransaction((err) => {
            if (err) {
                console.error('Error starting transaction:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            db.query(insertQuery, values, (err, result) => {
                if (err) {
                    console.error('Error inserting data into MySQL (students):', err);
                    db.rollback(() => {
                        res.status(500).json({ error: 'Internal Server Error' });
                    });
                } else {
                    db.query(aptitudeAccessQuery, aptitudeAccessValues, (err, result) => {
                        if (err) {
                            console.error('Error inserting data into MySQL (subject_access):', err);
                            db.rollback(() => {
                                res.status(500).json({ error: 'Internal Server Error' });
                            });
                        } else {
                            db.commit((err) => {
                                if (err) {
                                    console.error('Error committing transaction:', err);
                                    db.rollback(() => {
                                        res.status(500).json({ error: 'Internal Server Error' });
                                    });
                                } else {
                                    res.status(200).json({ message: 'Data inserted successfully' });
                                }
                            });
                        }
                    });
                }
            });
        });
    } catch (error) {
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

app.post('/teacher_signup', (req, res) => {
    try {
        const { roll_no, email, name, password, department_id } = req.body.teacherData;
        const insertQuery = "INSERT INTO teachers (`roll_no`, `email`, `name`, `password`, `department_id`) values (?, ?, ?, ?, ?)";
        const aptitudeAccessQuery = "INSERT INTO subject_access (`user_id`, `subject_id`) values (?, ?)";
        const values = [roll_no, email, name, password, department_id];
        const aptitudeAccessValues = [email, 40];
        db.beginTransaction((err) => {
            if (err) {
                console.error('Error starting transaction:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            db.query(insertQuery, values, (err, result) => {
                if (err) {
                    console.error('Error inserting data into MySQL (teachers):', err);
                    db.rollback(() => {
                        res.status(500).json({ error: 'Internal Server Error' });
                    });
                } else {
                    db.query(aptitudeAccessQuery, aptitudeAccessValues, (err, result) => {
                        if (err) {
                            console.error('Error inserting data into MySQL (subject_access):', err);
                            db.rollback(() => {
                                res.status(500).json({ error: 'Internal Server Error' });
                            });
                        } else {
                            db.commit((err) => {
                                if (err) {
                                    console.error('Error committing transaction:', err);
                                    db.rollback(() => {
                                        res.status(500).json({ error: 'Internal Server Error' });
                                    });
                                } else {
                                    res.status(200).json({ message: 'Data inserted successfully' });
                                }
                            });
                        }
                    });
                }
            });
        });
    }catch (error) {
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

app.post('/get_student_subjects', (req, res)=>{
    const {roll_no, email, name, password, department_id} = req.body.si;
    const selectQuery = `SELECT subject_id, subject_name from (SELECT s.subject_id, s.subject_name
    FROM subjects s 
    WHERE s.department_id = ? 
    UNION SELECT sa.subject_id, s.subject_name
    FROM subject_access sa
    JOIN subjects s ON sa.subject_id = s.subject_id
    JOIN students st ON sa.user_id = st.email
    WHERE st.email = ? AND st.department_id = ?) as combined_subjects;`
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
                const studentSubjectsList = results;
                res.status(200).json({studentSubjectsList});
            }
        }
    });
});

app.post('/schedule_test', (req, res)=>{
    try{
        const {id, title, marks, duration, difficulty, date, time, subject_id, teacher_email} = req.body.testDetails;
        const insertQuery = 'INSERT INTO tests (`id`, `title`, `marks`, `duration`, `difficulty`, `subject_id`, `teacher_email`, `date`, `time`) values (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [id, title, marks, duration, difficulty, subject_id, teacher_email, date, time];
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
        t.date AS test_date,
        t.time AS test_time,
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
        t.date AS test_date,
        t.time AS test_time,
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

app.post('/get_submitted_tests', (req, res)=>{
    try{
        const {roll_no, email, name, password, department_id} = req.body.si;
        const selectQuery = `SELECT DISTINCT id FROM test_responses WHERE student_id = ?;`
        const values = [roll_no];
        db.query(selectQuery, values, (error, results)=>{
            if(error){
                console.error('Error querying MySQL:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else{
                if(results.length === 0){
                    const submittedTestIds = [];
                    res.status(200).json({submittedTestIds});
                }
                else{
                    const submittedTestIds = results;
                    res.status(200).json({submittedTestIds});
                }
            }
        })
    }
    catch(error){
        console.error('Error handling login request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

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

app.post('/get_student_test_results', (req, res) => {
    const { si } = req.body; 
  
    const query = `
    SELECT 
      t.title,
      t.marks,
      t.duration,
      t.difficulty,
      s.subject_name,
      tr.marks_scored,
      tr.percentage,
      tr.id
    FROM 
      tests t
    INNER JOIN 
      subjects s ON t.subject_id = s.subject_id
    INNER JOIN 
      test_responses tr ON t.id = tr.id
    WHERE 
      tr.student_id = ?
  `
  
    db.query(query, [si.roll_no], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.json({ testResults:results });
    });
  });

app.post('/get_last_question', (req, res)=>{
    try{
        const {roll_no, email, name, password, department_id} = req.body.ti;
        const selectQuery = `SELECT * FROM questions_dataset ORDER BY question_id DESC LIMIT 1`;
        db.query(selectQuery, (error, results)=>{
            if(error){
                console.error('Error querying MySQL:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else{
                if(results.length === 0){
                    res.status(401).json({error: 'No match found!'});
                }
                else{
                    const lastQuestionId = results[0].question_id;
                    res.status(200).json({lastQuestionId});
                }
            }
        })
    }
    catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/add_question', (req, res)=>{
    try{
        const {question_id, question_text, option1, option2, option3, option4, correct_option, question_difficulty, subject_id, subject_name} = req.body.question;
        const insertQuery = `INSERT INTO questions_dataset values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
        const values = [question_id, question_text, option1, option2, option3, option4, correct_option, question_difficulty, subject_id, subject_name]
        db.query(insertQuery, values, (error, results)=>{
            if(error){
                console.error('Error querying MySQL:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else{
                res.status(200).json({message: 'Question Added Successfully!'});
            }
        })
    }catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/get_teacher_test_results', (req, res) => {
    const { ti } = req.body; 
    const selectQuery = `
        SELECT
        t.title,
        t.marks,
        t.duration,
        t.difficulty,
        tr.marks_scored,
        tr.percentage,
        st.roll_no AS roll_no,
        tr.id AS response_id,
        s.subject_name
    FROM
        tests AS t
    JOIN
        test_responses AS tr ON t.id = tr.id
    JOIN
        subjects AS s ON t.subject_id = s.subject_id
    JOIN
        students AS st ON tr.student_id = st.roll_no
    WHERE
        tr.teacher_id = ?`
  
    db.query(selectQuery, [ti.email], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.json({ testResults: results });
    });
  });

app.listen(port, ()=>{console.log('Listening on port', port)});