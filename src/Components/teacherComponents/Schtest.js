import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import axios from 'axios'
import { getTeacherDetails } from './Tclogin';

export default function Schtest() {
    useEffect(()=>{
        getTeacherProfile();
    }, []);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(0);
    const [department, setDepartment] = useState('');
    const [messageClass, setMessageClass] = useState('text-success');
    const scheduleFormStyle = {
        position: 'relative',
        top: '6%'
    }
    const separator = {
        height: '0.5px'
    }
    const departmentStyle ={
       marginTop: '-4px', 
       marginLeft: '7px'
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
        testSubject: 0,
        teacherEmail: ''
    });
    const generateTestId = () => {
        const  chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const firstCharIndex = Math.floor(Math.random() * chars.length);
        let secondCharIndex;
        do{
            secondCharIndex = Math.floor(Math.random() * chars.length);
        }while(secondCharIndex === firstCharIndex);
        const sequence = chars.charAt(firstCharIndex) + chars.charAt(secondCharIndex);
        return sequence;
    }
    async function getTeacherProfile() {
        try{
            const teacherDetails = getTeacherDetails();
            const ti = teacherDetails.teacherInfo;
            const response = await axios.post('http://localhost:9999/get_teacher_details', {ti});
            if(response.status === 200){
                const teacherProfileInfo = response.data;
                setDepartment(teacherProfileInfo.teacherProfileDetails.department_name);
                setTestInfo({...testInfo, teacherEmail: teacherProfileInfo.teacherProfileDetails.email});
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
    const scheduleTest = async () => {    
        const testId = generateTestId();
        const testDetails = {
                  id: testId,
                  title: testInfo.testTitle,
                  marks: testInfo.testMarks,
                  duration: testInfo.testDuration,
                  difficulty: testInfo.testDifficulty,
                  subject_id: testInfo.testSubject,
                  teacher_email: testInfo.teacherEmail
        };
        const message = document.getElementById('message');
        try{
            const response = await axios.post('http://localhost:9999/schedule_test', {testDetails});
            if(response.status===200){
                message.textContent = 'Test Scheduled!';
            }
            else{
                setMessageClass('text-danger');
                message.textContent = 'Failed to schedule test';
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
        }finally{
        document.getElementById('testTitleInput').value = '';
        document.getElementById('testMarksInput').value = '';
        }
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
                    <input type="text" onChange={(event)=>{setTestInfo({...testInfo, testMarks: parseInt(event.target.value)})}} className="form-control" id="testMarksInput"/>
                </div>
                <div className="btn-group dropdown h-25" style={durationStyle}>
                        <button type="button" className="btn btn-success border border-dark-subtle dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            {testInfo.testDuration === 60 ? '60 minutes' : testInfo.testDuration === 120 ? '120 minutes' : 'Duration'}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a onClick={()=>{setTestInfo({...testInfo, testDuration: 60})}} className="dropdown-item">60 minutes</a></li>
                            <li><a onClick={()=>{setTestInfo({...testInfo, testDuration: 120})}} className="dropdown-item">120 minutes</a></li>
                        </ul>
                </div>
                </div>
                <div className='d-flex justify-content-around' style={bottomDiv}>
                    <div className="dropdown">
                        <button id='subject-dropdown-button' className="btn btn-success border border-dark-subtle dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {'Subject'}
                        </button>
                        <ul className="dropdown-menu">
                        {subjects.map((subject, index) => (
                            <li key={index}
                                    onClick={() => {
                                        setSelectedSubject(subject.subject_id);
                                        setTestInfo({ ...testInfo, testSubject: subject.subject_id });
                                        document.getElementById('subject-dropdown-button').textContent = subject.subject_name;
                                    }}
                                    className="dropdown-item">
                                {subject.subject_name}
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div style={difficultyStyle}>
                    <ul className="list-group list-group-horizontal">
                        <button onClick={()=>{setTestInfo({...testInfo, testDifficulty: 'Easy'});}} className={`list-group-item border border-dark ${testInfo.testDifficulty === 'Easy' ? 'bg-white text-success fw-semibold' : 'bg-success text-white'}`} id="d_simple">Simple</button>
                        <button  onClick={()=>{setTestInfo({...testInfo, testDifficulty: 'Medium'});}} className={`list-group-item border border-dark ${testInfo.testDifficulty === 'Medium' ? 'bg-white text-dark fw-semibold' : 'bg-warning text-dark'}`} id="d_medium">Medium</button>
                        <button onClick={()=>{setTestInfo({...testInfo, testDifficulty: 'Hard'});}} className={`list-group-item border border-dark ${testInfo.testDifficulty === 'Hard' ? 'bg-white text-danger fw-semibold' : 'bg-danger text-white'}`} id="d_hard">Hard</button>
                        <button  onClick={()=>{setTestInfo({...testInfo, testDifficulty: 'Combined'});}} className={`list-group-item border border-dark ${testInfo.testDifficulty === 'Combined' ? 'bg-white text-dark fw-semibold' : 'bg-dark text-white'}`} id="d_combined">Combined</button>
                    </ul>
                    </div>
                    <div style={departmentStyle}> 
                        <p className='fs-5 fw-normal text-info-emphasis' style={departmentStyle}>Department: <span className='fw-semibold text-dark d-inline text-wrap'>{department}</span></p>
                    </div>
                </div>
                <div className='mt-3 bg-dark-subtle' style={separator}></div>
                <div className="d-flex justify-content-center mt-3">
                    <button type="button" onClick={scheduleTest} className="btn btn-outline-success fw-semibold">Schedule Test</button>
                </div>
                <p id='message' className={messageClass + " d-flex justify-content-center mt-2"}></p>
            </div>
        </div>
    </Layout>
  )
}
