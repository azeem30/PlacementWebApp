import React, { useEffect, useState } from 'react'
import Layout from '../commonComponents/Layout'
import { getStudentDetails } from './Stlogin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Tests() {
    useEffect(()=>{getPendingTests();}, []);
    const [tests, setTests] = useState([]);
    const navigate = useNavigate();
    let testListCardStyle = {
        width: '90%'
    }
    let containerStyle = {
        position:'relative',
        top: '4%',
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
    function startTest(test){
        const testJSON = JSON.stringify(test);
        navigate(`/question_and_answer?data=${encodeURIComponent(testJSON)}`);
    }
    async function getPendingTests(){
        try{
            const studentDetails = getStudentDetails();
            const si = studentDetails.studentInfo;
            const response  = await axios.post('http://localhost:9999/get_pending_tests', {si});
            if(response.status === 200){
                const pendingTests = response.data.pendingTestDetails.map((test)=>{
                    const testDateTime = new Date(`${test.test_date}T${test.test_time}`);
                    const currentDateTime = new Date();
                    const isTestReady = testDateTime <= currentDateTime ;
                    return {
                        ...test,
                        isReady: isTestReady,
                    }
                });
                setTests(pendingTests);
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
            <div class="card" style={testListCardStyle}>
                <div class="card-body">
                    <div className='d-flex justify-content-center'>
                        <h4 class="card-title">Pending Tests</h4>
                    </div>
                    <div className='bg-secondary' style={separator}></div>
                    <div className='mb-3'>
                    {tests.length === 0 ? (
                                <p className='d-flex justify-content-center fw-normal'>No tests scheduled for you at the moment!</p>
                            ) : (
                                <ol className="list-group">
                                    {tests.map((test, index) => (
                                        <div className='d-flex justify-content-evenly' key={index}>
                                            <li className='d-flex w-100 my-2 justify-content-between text-wrap rounded border border-success-subtle list-group-item'>
                                                <p className='my-2'>Title: <span className='fw-semibold'>{test.test_title}</span></p>
                                                <p className='my-2'>Marks: <span className='fw-semibold'>{test.test_marks}</span></p>
                                                <p className='my-2'>Duration: <span className='fw-semibold'>{`${test.test_duration} minutes`}</span></p>
                                                <p className='my-2'>Difficulty: <span className='fw-semibold'>{test.test_difficulty}</span></p>
                                                <p className='my-2'>Subject: <span className="fw-semibold">{test.subject_name}</span></p>
                                                <p className='my-2'>Date: <span className="fw-semibold">{test.test_date?.slice(0, 10)}</span></p>
                                                <p className='my-2'>Time: <span className="fw-semibold">{test.test_time}</span></p>
                                                <button onClick={() => startTest(test)} disabled={!test.isReady} className='btn btn-success' style={startButtonStyle}>Start</button>
                                            </li>
                                        </div>
                                    ))}
                                </ol>
                    )}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}
