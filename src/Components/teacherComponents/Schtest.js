import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import axios from 'axios'
import { getTeacherDetails } from './Tclogin';

export default function Schtest() {
    useEffect(()=>{
        getTeacherProfile();
    }, []);
    const scheduleFormStyle = {
        positon: 'relative',
        top: '6%'
    }
    const separator = {
        height: '0.5px'
    }
    const departmentStyle ={
       marginTop: '1px', 
    }
    const difficultyStyle ={
        marginLeft: '13px'
    }
    const textInputStyle = {
        width: '170px'
    }
    const bottomDiv = {
        marginTop: '40px'
    }
    const durationStyle = {
        marginTop: '31px'
    }
    const topDivStyle = {
        marginRight: '30px'
    }
    const [testInfo, setTestInfo] = useState({
        testTitle: '',
        testMarks: 0,
        testDuration: 0,
        testDifficulty: '',
        testSubject: ''
    });
    const [department, setDepartment] = useState('');
    async function getTeacherProfile() {
        try{
            const teacherDetails = getTeacherDetails();
            const ti = teacherDetails.teacherInfo;
            const response = await axios.post('http://localhost:9999/get_teacher_details', {ti});
            if(response.status === 200){
                const teacherProfileInfo = response.data;
                setDepartment(teacherProfileInfo.teacherProfileDetails.department_name);
            }
            else{
                console.log('Failed to get data');
            }
        }catch(error)
        {
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
    const scheduleTest = () => {    
        const testDetails = {
                  title: testInfo.testTitle,
                  marks: testInfo.testMarks,
                  duration: testInfo.testDuration,
                  difficulty: testInfo.testDifficulty,
                  subject: testInfo.testSubject,
        };
        document.getElementById('testTitleInput').value = '';
        document.getElementById('testMarksInput').value = '';
    } 
  return (
    <Layout>
        <div className="card container w-50" style={scheduleFormStyle}>
            <div className="card-body">
                <div className='d-flex justify-content-center'>
                    <h4 className='fw-semibold text-wrap'>Schedule a Test</h4>
                </div>
                <div className='mb-3 bg-dark-subtle' style={separator}></div>
                <div className='d-flex justify-content-around' style={topDivStyle}>
                <div className="mb-3">
                    <label for="testTitleInput" className="form-label fw-semibold">Title</label>
                    <input type="text" onChange={(event)=>{setTestInfo({...testInfo, testTitle: event.target.value})}} className="form-control" id="testTitleInput" style={textInputStyle}/>
                </div>
                <div className='mb-3'>
                    <label for="testMarksInput" className="form-label fw-semibold">Marks</label>
                    <input type="text" onChange={(event)=>{setTestInfo({...testInfo, testMarks: event.target.value})}} className="form-control" id="testMarksInput"/>
                </div>
                <div className="btn-group dropdown h-25" style={durationStyle}>
                        <button type="button" className="btn btn-success border border-dark-subtle dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Duration
                        </button>
                        <ul className="dropdown-menu">
                            <li><a onClick={()=>{setTestInfo({...testInfo, testDuration: 60})}} className="dropdown-item" href="#">60 minutes</a></li>
                            <li><a onClick={()=>{setTestInfo({...testInfo, testDuration: 120})}} className="dropdown-item" href="#">120 minutes</a></li>
                        </ul>
                </div>
                </div>
                <div className='d-flex justify-content-around' style={bottomDiv}>
                    <div className="dropdown">
                        <button className="btn btn-outline-success text-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Subject
                        </button>
                        <ul className="dropdown-menu">
                            <li><a onClick={()=>{setTestInfo({...testInfo, testSubject: 1})}} id='subject_dsa' className="dropdown-item" href="#">DSA</a></li>
                            <li><a onClick={()=>{setTestInfo({...testInfo, testSubject: 2})}} id='subject_dbms' className="dropdown-item" href="#">DBMS</a></li>
                            <li><a onClick={()=>{setTestInfo({...testInfo, testSubject: 4})}} id='subject_java' className="dropdown-item" href="#">Java</a></li>
                            <li><a onClick={()=>{setTestInfo({...testInfo, testSubject: 5})}} id='subject_py' className="dropdown-item" href="#">Python</a></li>
                            <li><a onClick={()=>{setTestInfo({...testInfo, testSubject: 3})}} id='subject_os' className="dropdown-item" href="#">OS</a></li>
                        </ul>
                    </div>
                    <div style={difficultyStyle}>
                    <ul className="list-group list-group-horizontal">
                        <li onClick={()=>{setTestInfo({...testInfo, testDifficulty: 'Easy'})}} className="list-group-item bg-success text-white border border-dark" id="d_simple">Simple</li>
                        <li onClick={()=>{setTestInfo({...testInfo, testDifficulty: 'Medium'})}} className="list-group-item bg-warning text-dark border border-dark" id="d_medium">Medium</li>
                        <li onClick={()=>{setTestInfo({...testInfo, testDifficulty: 'Hard'})}} className="list-group-item bg-danger text-white border border-dark" id="d_hard">Hard</li>
                        <li onClick={()=>{setTestInfo({...testInfo, testDifficulty: 'Combined'})}} className="list-group-item bg-dark text-white border border-dark" id="d_combined">Combined</li>
                    </ul>
                    </div>
                    <div style={departmentStyle}> 
                        <p className='fs-4 fw-normal text-info-emphasis' style={departmentStyle}>Department: <p className='fst-normal text-dark d-inline text-wrap'>{department}</p></p>
                    </div>
                </div>
                <div className='mt-3 bg-dark-subtle' style={separator}></div>
                <div className="d-flex justify-content-center mt-3">
                    <button type="button" onClick={scheduleTest} className="btn btn-outline-success fw-semibold">Schedule Test</button>
                </div>
            </div>
        </div>
    </Layout>
  )
}
