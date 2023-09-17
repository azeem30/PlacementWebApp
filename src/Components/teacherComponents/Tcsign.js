import React, { useState } from 'react'
import Layout from '../Layout'
import { emailPattern, passwordPattern } from '../patterns/patterns';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Tcsign() {
  const navigate = useNavigate();
  const [tRoll, setTRoll] = useState('');
  const [tName, setTName] = useState('');
  const [tDepartment, tSetDepartment] = useState(0);
  const [tMail, tSetMail] = useState('');
  const [tPassword, tSetPassword] = useState('');
  const [messageClass, setMessageClass] = useState(`text-success`);

  const teacherData = {
    roll_no: tRoll,
    name: tName,
    email: tMail,
    password: tPassword,
    department_id: tDepartment
  }

  const registerTeacher = () => {
    const teacherEmailError = document.getElementById('teacher-email-error');
    const teacherPasswordError = document.getElementById('teacher-password-error');
    const registration_message = document.getElementById('registration-message');
    if(!emailPattern.test(tMail)){
      teacherEmailError.textContent = 'Invalid email format!'
    }
    else if(!passwordPattern.test(tPassword)){
      teacherPasswordError.textContent = 'The password should contain uppercase letters, one special symbol, numbers and should be 8 characters long'
    }
    else{
        axios.post(`http://localhost:9999/teacher_signup`, {teacherData}).
        then((res) => 
        {
          registration_message.textContent='Registration Successful!';
          navigate('/teacher_login');
        })
        .catch((error) => {
          if (error.response) {
            setMessageClass(`text-danger`);
            registration_message.textContent = `Server Error: ${error.response.data}`; //idhar server error thoda defined chaiye like already exists hai toh frontend pe 'Server Error: [object object]' display kar ra instead show already registered
          } else if (error.request) {
            setMessageClass(`text-danger`);
            registration_message.textContent = `No response received from the server`;
          } else {
            setMessageClass(`text-danger`);
            registration_message.textContent = `Request Error: ${error.message}`;
          }
        }).finally(()=>{      
      teacherEmailError.textContent = "";
      teacherPasswordError.textContent = '';})
    }
  }
  let signCardStyle = {
    position: 'relative',
    top: '4%'
}
let separator = {
  height: '0.5px',
  marginTop: '5px',
  marginBottom: '10px'
}
let departmentDropdownStyle = {
  marginTop: '30px',
  marginRight: '40px'
}
let signButtonStyle ={
  marginTop: '15px',
}
  return (
    <Layout>
      <form onSubmit={registerTeacher} className="container w-25 card border border-dark-subtle" style={signCardStyle}>
        <div className="card-body">
            <div className='d-flex justify-content-center'>
                <h4>Teacher Signup</h4>
            </div>
            <div style={separator} className='bg-secondary'></div>
            <div className="mb-3">
              <label htmlFor="teacherSignRoll" className='form-label'>Roll no.</label>
              <input type="text" id="tecaherSignRoll" onChange={(event)=>{setTRoll(event.target.value)}} className="form-control" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="teacherSignName" className='form-label'>Name</label>
              <input type="text" id="tecaherSignName" onChange={(event)=>{setTName(event.target.value)}} className="form-control" required/>
            </div>
            <div className="mt-2 mb-3">
                <label htmlFor="teacherSignMail" className="form-label">Email</label>
                <input type="email" onChange={(event)=>{tSetMail(event.target.value)}} className="form-control" id="teacherSignMail" required/>
                <p className='text-danger' id='teacher-email-error'></p>
            </div>
            <div className="mb-3">
                <label htmlFor="teacherSignPassword" className="form-label">Password</label>
                <input type="password" id="teacherSignPassword" onChange={(event)=>{tSetPassword(event.target.value)}} required className="form-control" aria-describedby="passwordHelpBlock"/>
                <p className='text-danger' id='teacher-password-error'></p>
            </div>
            <div className="dropdown mb-3" style={departmentDropdownStyle}>
              <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {tDepartment || 'Department'}
              </button>
              <ul className="dropdown-menu">
                <li><a id="cs" onClick={()=>{tSetDepartment(1)}} className="dropdown-item">Computer Science</a></li>
                <li><a id="it" onClick={()=>{tSetDepartment(5)}} className="dropdown-item">I.T.</a></li>
                <li><a id="elect" onClick={()=>{tSetDepartment(4)}} className="dropdown-item">Electrical</a></li>
                <li><a id="extc" onClick={()=>{tSetDepartment(3)}} className="dropdown-item">EXTC</a></li>
                <li><a id="mech" onClick={()=>{tSetDepartment(2)}} className="dropdown-item">Mechanical</a></li>
              </ul>
            </div>
            <div className='bg-secondary' style={separator}></div>
            <div className="d-flex justify-content-center" style={signButtonStyle}>
                <button type="button" onClick={registerTeacher} className="btn btn-outline-success">Register</button>
            </div>
            <p className={messageClass + ' d-flex justify-content-center mt-3'} id='registration-message'></p>
        </div>
      </form>
    </Layout>
  )
}
