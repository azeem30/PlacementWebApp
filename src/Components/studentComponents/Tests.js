import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { getStudentDetails } from './Stlogin';
import axios from 'axios';

export default function Tests() {
    useEffect(()=>{getStudentProfile();}, []);
    const [sdn, setSdn] = useState('');
    const [tests, setTests] = useState(null);
    const pendingTestsData = [
        {title: 'Title1', marks: '100', duration: '60 minutes'}, 
        {title: 'Title2', marks: '100', duration: '60 minutes'}, 
        {title: 'Title3', marks: '100', duration: '60 minutes'}
    ]
    let testListCardStyle = {
        width: '18rem'
    }
    let containerStyle = {
        position:'relative',
        top: '4%'
    }
    let separator = {
        height: '0.5px',
        marginTop: '2px',
        marginBottom: '15px'
    }
    let startButtonStyle ={
        width: '60px',
        height: '40px',
        marginTop: '8px'
    }
    async function getStudentProfile(){
        try{
            const studentDetails = getStudentDetails();
            const si = studentDetails.studentInfo;
            const response = await axios.post('http://localhost:9999/get_student_details', {si});
            if(response.status === 200){
                const studentProfileInfo = response.data;
                setSdn(studentProfileInfo.studentProfileDetails.department_name);
            }
            else{
                console.log('Failed to get data');
            }
        }catch(error){
            if (error.response) {
                console.error('Server responded with status:', error.response.status);
                console.error('Response data:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    }
    async function getPendingTests(){
        try{
            const studentDetails = getStudentDetails();
            const si = studentDetails.studentInfo;
            const response  = await axios.post('http://localhost:9999/get_pending_tests', {si});
            if(response.status === 200){
                
            }
            else{
                console.log('Failed to get data');
            }
        }catch(error){
            if (error.response) {
                console.error('Server responded with status:', error.response.status);
                console.error('Response data:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    }
  return (
    <Layout>
        <div className="container d-flex justify-content-center" style={containerStyle}>
            <div class="card w-75" style={testListCardStyle}>
                <div class="card-body">
                    <div className='d-flex justify-content-center'>
                        <h4 class="card-title">Pending Tests</h4>
                    </div>
                    <div className='bg-secondary' style={separator}></div>
                    <div className='mb-3'>
                        <ol class="list-group">
                            {pendingTestsData.map((test, index)=>(
                                <div className='d-flex justify-content-evenly' key={index}>
                                    <li className='d-flex w-75 my-1 justify-content-between text-wrap rounded-start border border-success-subtle list-group-item'>
                                        <p className='fw-semibold text-wrap'>{test.title}</p>
                                        <p>Marks: <span className='fw-semibold'>{test.marks}</span></p>
                                        <p>Duration: <span className='fw-semibold'>{test.duration}</span></p>
                                    </li>
                                    <button className='btn btn-success' style={startButtonStyle}>Start</button>
                                </div>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}
