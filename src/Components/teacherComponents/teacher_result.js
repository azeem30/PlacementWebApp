import React, { useState, useEffect } from 'react'
import Layout from '../commonComponents/Layout'
import { Link } from 'react-router-dom'
import {emailPattern} from '../patterns/patterns'
import axios from 'axios';
import { getTeacherDetails } from './Tclogin';
import {useNavigate} from 'react-router';
import Transitions from '../commonComponents/Trasitions';
import Navbar from '../commonComponents/Navbar';

export default function Teacher_results(){
    useEffect(()=>{
        getTeacherTestResponses();
    }, []);
   const [testResponses, setTestResponses] = useState([]); 
   const [subjects, setSubjects] = useState([]);
   const [filter, setFilter] = useState('');
   const [isLoading, setIsLoading] = useState(true);
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
        height:'40px',
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
            const response = await axios.post('http://localhost:9999/get_teacher_test_results', {ti});
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
        try{
            const teacherDetails = getTeacherDetails();
            const ti = teacherDetails.teacherInfo;
            const response = await axios.post('http://localhost:9999/get_teacher_subjects', {ti});
            if(response.status === 200){
                const teacherSubjects = response.data;
                const tsl = teacherSubjects.teacherSubjectsList;
                setSubjects(tsl);
            }
            else{
                console.log(`Failed to fetch teacher's subjects`);
            }
        }catch(error){
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
        }finally{
            setIsLoading(false);
        }
    }
    const handleFilter = (subject) => {
        setFilter(subject);
    }
    const filteredTestResponses = filter ? testResponses.filter((testResponse) => testResponse.subject_name === filter) : testResponses;
        return (
            <Layout>
                <Navbar title='AptiPro' isLoggedIn={true} componentName='TeacherResults'/>
                {isLoading ? (
                    <p className='text-dark fw-lighter fs-12'>Loading...</p>
                    ) : 
                    (
                    <div style={containerStyle} className="container rounded bg-white">
                    <div className="d-flex justify-content-around">
                        <h4 style={headerStyle} className="card-title">Submitted Tests</h4>
                        <div className="btn-group my-2" style={buttonStyle}>
                            <button type="button" id='subject_display' className="btn mt-1 btn-white text-dark fw-semibold dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Filter
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    subjects.map((subject, index)=>(
                                        <li 
                                            className='dropdown-item'
                                            key={subject.subject_id}
                                            onClick={()=>{
                                                const subjectDisplay = document.getElementById('subject_display');
                                                subjectDisplay.textContent = subject.subject_name
                                                handleFilter(subject.subject_name); 
                                            }}>
                                            {subject.subject_name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="btn-group my-2" style={buttonStyle}>
                            <button type="button" className="btn mt-1 btn-white text-dark fw-semibold dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort by
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Date</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-secondary" style={separator}></div>
                    <div className="list-group">
                        {filteredTestResponses.map((result, index) => (
                            <div className='d-flex justify-content-evenly' key={index}>
                                <li className='d-flex w-100 my-2 justify-content-between text-wrap rounded border border-success-subtle list-group-item'>
                                    <p className='my-2'>Title: <span className='fw-semibold'>{result.title}</span></p>
                                    <p className='my-2'>Marks: <span className='fw-semibold'>{result.marks}</span></p>
                                    <p className='my-2'>Duration: <span className='fw-semibold'>{`${result.duration} minutes`}</span></p>
                                    <p className='my-2'>Difficulty: <span className='fw-semibold'>{result.difficulty}</span></p>
                                    <p className='my-2'>Subject name: <span className="fw-semibold">{result.subject_name}</span></p>
                                    <p className='my-2'>Marks Obtained: <span className="fw-semibold">{result.marks_scored}</span></p>
                                    <p className='my-2'>Percentage: <span className="fw-semibold">{`${parseFloat(result.percentage).toFixed(2)}%`}</span></p>
                                </li>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </Layout>
        )
}