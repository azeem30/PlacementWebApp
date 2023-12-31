import React, { useState } from 'react'
import Layout from '../commonComponents/Layout'
import { Link } from 'react-router-dom'
import {emailPattern} from '../patterns/patterns'
import axios from 'axios';
import {useNavigate} from 'react-router';
import Transitions from '../commonComponents/Trasitions';
let teacherProfile;
export function getTeacherDetails(){
    return teacherProfile;
}

export default function Tclogin() {
    const navigate = useNavigate();
    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');
    const [messageClass, setMessageClass] = useState('text-success');
    let logCardStyle = {
        position: 'relative',
        top: '6%'
    }
    let logButtonStyle ={
        marginTop: '30px',
    }
    let extraTextStyle = {
        marginBottom: '0px',
        marginTop: '10px'
    }
    let belowSeparator={
        height:'0.5px',
        marginTop: '20px'
    }
    let aboveSeparator={
        height:'0.5px',
        marginTop: '5px'
    }
    const loginTeacher = async (event) => {
        event.preventDefault();
        const emailValidation = document.getElementById('email-validation');
        const loginMessage = document.getElementById('login-message');
        if(!emailPattern.test(email)){
            emailValidation.textContent = 'Invalid email format!'
        }
        else{
            const loginTeacherData = {
                email: email,
                password: password
            };
            try{
                const response = await axios.post('http://localhost:9999/teacher_login', {loginTeacherData});
                if(response.status === 200){
                   teacherProfile = response.data;
                   loginMessage.textContent='Login Successful!';
                   navigate('/teacher_home');
                }
                else{
                    setMessageClass('text-danger');
                    loginMessage.textContent = 'Invalid credentials';
                }
            }catch(error){
                setMessageClass('text-danger');
                loginMessage.textContent = `Error Handling Login: ${error}`;
            }
        }
    };
  return (
    <Transitions> 
    <Layout>
    <form onSubmit={loginTeacher} className="container w-25 card border border-dark-subtle" style={logCardStyle}>
        <div className="card-body">
            <div className='d-flex justify-content-center'>
                <h4>Teacher Login</h4>
            </div>
            <div className='border border-secondary' style={aboveSeparator}></div>
            <div className="mt-3 mb-3">
                <label for="exampleFormControlInputTc" className="form-label">Email</label>
                <input type="email" onChange={(event)=>{getEmail(event.target.value)}} className="form-control" id="exampleFormControlInputSt" placeholder="name@example.com"/>
                <p class='text-danger' id='email-validation'></p>
            </div>
            <div className="mb-3">
                <label for="inputPasswordTc" className="form-label">Password</label>
                <input type="password" onChange={(event)=>{getPassword(event.target.value)}} id="inputPasswordSt" className="form-control" aria-describedby="passwordHelpBlock"/>
                <p class='text-danger' id='password-validation'></p>           
            </div>
            <div className="d-flex justify-content-center" style={logButtonStyle}>
                <button type="submit" class="btn btn-info  border border-primary">Login</button>
            </div>
            <p class={messageClass + ' d-flex justify-content-center mt-2'} id='login-message'></p>
            <div className='border border-secondary' style={belowSeparator}></div>
            <div className='d-flex justify-content-center'>
                <p className='fw-semibold' style={extraTextStyle}>New Teacher? <Link className='nav-item' to='/teacher_signup'>Signup</Link></p>
            </div>
        </div>
    </form>
    </Layout>
    </Transitions>
  )
}