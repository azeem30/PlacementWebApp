import React, { useState, useEffect } from 'react'
import Layout from '../commonComponents/Layout'
import { Link } from 'react-router-dom'
import {emailPattern} from '../patterns/patterns'
import axios from 'axios';
import { getTeacherDetails } from './Tclogin';
import {useNavigate} from 'react-router';
import Transitions from '../commonComponents/Trasitions';

export default function Teacher_results(){
    useEffect(()=>{
        getTeacherTestResponses();
    }, []);
   const [testResponses, setTestResponses] = useState([]); 
    let containerStyle = {
        position: 'relative',
        top: '3%',
        width:'80%'
    }
    let separator = {
        height: '0.5px',
        marginTop: '3px'
    }
    let buttonStyle = {
        height:'40px'
    }
    let headerStyle = {
        position: 'relative',
        top: '17px',
        left: '-50px'
    }   
        
    const getTeacherTestResponses = async () => {
        try{
            const teacherDetails = getTeacherDetails();
            const ti = teacherDetails.teacherInfo;
            const response = axios.post('http://localhost:9999/getteacher_test_results', {ti});
            if(response.status === 200){
                const fetchedResponses = response.data.testResults;
                console.log('Tests fetched successfully!');
                console.log(fetchedResponses);
                setTestResponses(fetchedResponses);
            }
            else{
                console.log('Failed to fetch tests');
            }
        }
        catch(error){
            if(error.response){
            console.error('Response Error', error.response.status);
            console.error('Response Data',error.response.data)
            } 
        else if (error.request) {
            console.error('No Response received:', error.request);
            } 
        else {
            console.error('Error' , error.message);
            }
        }
    }

        return (
            <Layout>
                <div style={containerStyle} className="container rounded w-50 bg-white">
                    <div className="d-flex justify-content-around">
                        <h4 style={headerStyle} className="card-title">Submitted Tests</h4>
                        <div className="btn-group my-2" style={buttonStyle}>
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Subjects
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">D.S.A</a></li>
                                <li><a className="dropdown-item" href="#">D.B.M.S</a></li>
                                <li><a className="dropdown-item" href="#">Java</a></li>
                                <li><a className="dropdown-item" href="#">Python</a></li>
                                <li><a className="dropdown-item" href="#">OS</a></li>
                                <li><a className="dropdown-item" href="#">Aptitude</a></li>
                            </ul>
                        </div>
                        <div className="btn-group my-2" style={buttonStyle}>
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort by
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Date</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-secondary" style={separator}></div>
                    <div className="list-group">
                        {/*testResults.map((result, index) => (
                            <div className='d-flex justify-content-evenly' key={index}>
                                <li className='d-flex w-100 my-2 justify-content-between text-wrap rounded border border-success-subtle list-group-item'>
                                    <p className='my-2'>Title: <span className='fw-semibold'>{result.title}</span></p>
                                    <p className='my-2'>Marks: <span className='fw-semibold'>{result.marks}</span></p>
                                    <p className='my-2'>Duration: <span className='fw-semibold'>{`${result.duration} minutes`}</span></p>
                                    <p className='my-2'>Difficulty: <span className='fw-semibold'>{result.difficulty}</span></p>
                                    <p className='my-2'>Subject name: <span className="fw-semibold">{result.subject_name}</span></p>
                                    <p className='my-2'>Marks Obtained: <span className="fw-semibold">{result.marks_scored}</span></p>
                                    <p className='my-2'>Percentage: <span className="fw-semibold">{result.percentage}</span></p>
                                </li>
                            </div>
                        ))*/}
                    </div>
                </div>
            </Layout>
        )
}