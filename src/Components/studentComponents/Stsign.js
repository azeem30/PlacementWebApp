import React, {useState} from 'react'
import axios from 'axios'
import Layout from '../commonComponents/Layout'
import {emailPattern, passwordPattern} from '../patterns/patterns'
import { useNavigate } from 'react-router-dom'

export default function Stsign() { 
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [department, setDepartment] = useState(1);
  const [semester, setSemester] = useState(1);
  const [messageClass, setMessageClass] = useState(`text-success`);
  const [studentName, setStudentName] = useState('');
  const [results, setResults] = useState([
    { sem: 1, sgpi: '', cgpi: '', required: true},  
    { sem: 2, sgpi: '', cgpi: '', required: true},
    { sem: 3, sgpi: '', cgpi: '', required: false},
    { sem: 4, sgpi: '', cgpi: '', required: false},
    { sem: 5, sgpi: '', cgpi: '', required: false},
    { sem: 6, sgpi: '', cgpi: '', required: false},
    { sem: 7, sgpi: '', cgpi: '', required: false},
    { sem: 8, sgpi: '', cgpi: '', required: false},
  ]);
  const studentData = {
    roll_no: id,
    email: studentEmail,
    name: studentName,
    password: studentPassword,
    department_id: department,
    semester: semester,
    sgpi: results.map((result) => result.sgpi.toString()),
    cgpi: results.map((result) => result.cgpi.toString())
  };
  function calcCGPI(sgpi){
    return sgpi*10;
  }
  const registerStudent = (event) => {
    event.preventDefault();
    const email_error = document.getElementById('email-error');
    const password_error = document.getElementById('password-error');
    const registration_message = document.getElementById('registration-message');
    if(!emailPattern.test(studentEmail)){
      email_error.textContent = 'Invalid email format!';
    }
    else if(!passwordPattern.test(studentPassword)){
      password_error.textContent = 'The password should contain uppercase letters, one special symbol, numbers and should be 8 characters long';
    }
    else{
        axios.post(`http://localhost:9999/student_signup`, {studentData}).
        then((res) => {
          registration_message.textContent='Registration Successful!';
          navigate('/student_login');
        })
        .catch((error) => {
          if (error.response) {
            setMessageClass(`text-danger`);
            registration_message.textContent = `Server Error: ${error.response.data}`;
          } else if (error.request) {
            setMessageClass(`text-danger`);
            registration_message.textContent = `No response received from the server`;
          } else {
            setMessageClass(`text-danger`);
            registration_message.textContent = `Request Error: ${error.message}`;
          }
        }).finally(()=>{
          email_error.textContent = '';
          password_error.textContent = '';
        })
    } 
  };

let signCardStyle = {
    position: 'relative',
    top: '4%'
}
let signButtonStyle ={
    marginTop: '30px',
}
let belowSeparator={
    height:'0.5px',
    marginTop: '20px'
}
let aboveSeparator={
    height:'0.5px',
    marginTop: '5px'
}
let departmentDropdownStyle = {
  marginTop: '30px',
  marginRight: '40px'
}
  return (
    <Layout>
      <form onSubmit={registerStudent} className="container w-25 card border border-dark-subtle" style={signCardStyle}>
        <div className="card-body">
            <div className='d-flex justify-content-center'>
                <h4>Student Signup</h4>
            </div>
            <div className='border border-secondary' style={aboveSeparator}></div>
	          <div className="mt-3 mb-3">
                <label for="studentSignName" className="form-label">Name</label>
                <input type="text" className="form-control" id="studentSignName" onChange={(event) => {setStudentName(event.target.value);}} required/>
            </div>
            <div className="mt-3 mb-3">
              <label for="studentSignMail" className="form-label">Email</label>
              <input type="email" id="studentSignMail" placeholder='name@example.com' className='form-control' onChange={(event)=>{setStudentEmail(event.target.value)}} required/>
              <p className='text-danger' id='email-error'></p>
            </div>
            <div className="mt-3 mb-3">
                <label for="studentSignRollNo" className="form-label">Roll No.</label>
                <input type="text" className="form-control" id="studentSignRollNo" onChange={(event) => {setId(event.target.value);}} required/>
            </div>
            <div className="mb-3">
                <label for="studentSignPassword" className="form-label">Password</label>
                <input type="password" id="studentSignPassword" onChange={(event)=>{setStudentPassword(event.target.value);}} required className="form-control" aria-describedby="passwordHelpBlock"/>
                <p className='text-danger' id='password-error'></p>
            </div>
            <div className="dropdown" style={departmentDropdownStyle}>
              <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {("Sem " + semester) || 'Semester'}
              </button>
              <ul className="dropdown-menu">
                <li><a id="s3" onClick={()=>{setSemester(3)}} className="dropdown-item">3</a></li>
                <li><a id="s4" onClick={()=>{setSemester(4)}} className="dropdown-item">4</a></li>
                <li><a id="s5" onClick={()=>{setSemester(5)}} className="dropdown-item">5</a></li>
                <li><a id="s6" onClick={()=>{setSemester(6)}} className="dropdown-item">6</a></li>
                <li><a id="s7" onClick={()=>{setSemester(7)}} className="dropdown-item">7</a></li>
                <li><a id="s8" onClick={()=>{setSemester(8)}} className="dropdown-item">8</a></li>
              </ul>
            </div>
            <div className="dropdown" style={departmentDropdownStyle}>
              <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {department || 'Department'}
              </button>
              <ul className="dropdown-menu">
                <li><a id="cs" onClick={()=>{setDepartment(1)}} className="dropdown-item">Computer Science</a></li>
                <li><a id="it" onClick={()=>{setDepartment(5)}} className="dropdown-item">I.T.</a></li>
                <li><a id="elect" onClick={()=>{setDepartment(4)}} className="dropdown-item">Electrical</a></li>
                <li><a id="extc" onClick={()=>{setDepartment(3)}} className="dropdown-item">EXTC</a></li>
                <li><a id="mech" onClick={()=>{setDepartment(2)}} className="dropdown-item">Mechanical</a></li>
              </ul>
            </div>
            <div className='border border-secondary' style={belowSeparator}></div>
              <div className='d-flex justify-content-center mt-4'>
                  <h4>Results</h4>
              </div>
            {results.map((result) => (
            <table className='table table-bordered border-dark-subtle'>
            <tr className='mx-2' key={result.sem}>
              <th scope="row">{result.sem}</th>
              <td>
                <input
                    className="form-control my-1 mx-1"
                    type="text"
                    aria-label={`Semester ${result.sem} SGPI`}
                    placeholder='SGPI'
                    value={result.sgpi}
                    onChange={(e) =>{
                      const sgpi = e.target.value;
                      const cgpi = calcCGPI(parseFloat(sgpi))
                      setResults((prevResults) =>
                        prevResults.map((prevResult) =>
                          prevResult.sem === result.sem
                            ? { ...prevResult, sgpi, cgpi}
                            : prevResult  
                        )
                      )
                    }}
                    required={result.required}/></td>
                <td>
                  <input
                    className="form-control my-1 mx-1"
                    type="text"
                    aria-label={`Semester ${result.sem} CGPI`}
                    value={result.cgpi}
                    placeholder='CGPI'
                    readOnly
                  />
                </td>
            </tr>
            </table>))}
            <div className='border border-secondary' style={belowSeparator}></div>
            <div className="d-flex justify-content-center" style={signButtonStyle}>
                <button type="submit" className="btn btn-outline-success">Register</button>
            </div>
            <p className={messageClass + ' d-flex justify-content-center mt-3'} id='registration-message'></p>
        </div>
    </form>
    </Layout>
  )
}
