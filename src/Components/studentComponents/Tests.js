import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { getStudentDetails } from './Stlogin';
import axios from 'axios';

export default function Tests() {
    useEffect(()=>{getPendingTests();}, []);
    const [tests, setTests] = useState([]);
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
    }
    async function getPendingTests(){
        try{
            const studentDetails = getStudentDetails();
            const si = studentDetails.studentInfo;
            const response  = await axios.post('http://localhost:9999/get_pending_tests', {si});
            if(response.status === 200){
                console.log(response.data.pendingTestDetails);
                setTests(response.data.pendingTestDetails);
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
                            {tests.map((test, index)=>(
                                <div className='d-flex justify-content-evenly' key={index}>
                                    <li className='d-flex w-100 my-2 justify-content-between text-wrap rounded border border-success-subtle list-group-item'>
                                        <p className='my-2'>Title: <span className='fw-semibold'>{test.test_title}</span></p>
                                        <p className='my-2'>Marks: <span className='fw-semibold'>{test.test_marks}</span></p>
                                        <p className='my-2'>Duration: <span className='fw-semibold'>{`${test.test_duration} minutes`}</span></p>
                                        <p className='my-2'>Difficulty: <span className='fw-semibold'>{test.test_difficulty}</span></p>
                                        <p className='my-2'>Subject: <span className="fw-semibold">{test.subject_name}</span></p>
                                        <button className='btn btn-success' style={startButtonStyle}>Start</button>
                                    </li>
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
