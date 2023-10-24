import React, { useState, useEffect } from 'react'
import Layout from '../commonComponents/Layout'
import Navbar  from '../commonComponents/Navbar'
import { getTeacherDetails } from './Tclogin';
import axios from 'axios';

export default function AddQuestions() {
    useEffect(()=>{
        getTeacherSubjects();
    }, []);
    const [subjects, setSubjects] = useState([]);
    const [messageClass, setMessageClass] = useState('text-success');
    const [question, setQuestion] = useState({
        question_id: 0,
        question_text: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correct_option: '',
        question_difficulty: '',
        subject_id: 0,
        subject_name: ''
    });
    const [isConfirmationBoxVisible, setConfirmationBoxVisible] = useState(false);
    const displayMessage = document.getElementById('message');
    let addQuestionStyle = {
        position: 'relative',
        top: '4%'
    }
    let separator = {
        height: '0.5px'
    }
    async function getTeacherSubjects(){
        try{
            const teacherDetails = getTeacherDetails();
            const ti = teacherDetails.teacherInfo;
            const response = await axios.post('http://localhost:9999/get_last_question', {ti});
            if(response.status == 200){
                const lastQId = response.data.lastQuestionId;
                setQuestion({...question, question_id: lastQId + 1});
            }
            else{
                console.log(`Failed to fetch last question`);
            }
        }
        catch(error){
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
    const openConfirmationBox = () => {
        setConfirmationBoxVisible(true);
    }
    const closeConfirmationBox = () => {
        setConfirmationBoxVisible(false);
    }
    const submitQuestionAfterConfirmation = async () => {
        setConfirmationBoxVisible(false);
        try{
            const response = await axios.post('http://localhost:9999/add_question', {question});
            if(response.data === 200){
                displayMessage.textContent = 'Question Added Successfully!';
            }
            else{
                setMessageClass('text-danger');
                displayMessage.textContent = 'Failed to Add Question';
            }
        }catch(error){
            if (error.response) {
                console.error('Server responded with status:', error.response.status);
                console.error('Response data:', error.response.data);
                setMessageClass('text-danger');
                displayMessage.textContent = `${error.response.data}`;
            } else if (error.request) {
                setMessageClass('text-danger');
                displayMessage.textContent = `${error.request}`;
            } else {
                setMessageClass('text-danger');
                displayMessage.textContent = `${error.message}`;
            }
        }
        finally{
            setQuestion({...question,
                question_id: 0,
                question_text: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                correct_option: '',
                question_difficulty: '',
                subject_id: 0,
                subject_name: ''
            });
        }
    }
  return (
    <Layout>
      <Navbar title='AptiPro' isLoggedIn={true} componentName='AddQuestions'/>
      <div className="card container w-50" style={addQuestionStyle}>
        <div className="card-body">
            <div className='d-flex justify-content-center'>
                <h4 className='fw-semibold text-wrap'>Add A Question</h4>
            </div>
            <div className='mb-3 bg-dark-subtle' style={separator}></div>
            <div className='d-block'>
                <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label fw-semibold">Question</label>
                <textarea onChange={(event)=>{setQuestion({...question, question_text: event.target.value})}} class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                </div>
                <div class="input-group mb-3">
                <span class="input-group-text fw-semibold" id="basic-addon1">A</span>
                <input type="text" onChange={(event)=>{setQuestion({...question, option1: event.target.value})}} class="form-control" placeholder="Option A" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                <span class="input-group-text fw-semibold" id="basic-addon1">B</span>
                <input type="text" onChange={(event)=>{setQuestion({...question, option2: event.target.value})}} class="form-control" placeholder="Option B" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                <span class="input-group-text fw-semibold" id="basic-addon1">C</span>
                <input type="text" onChange={(event)=>{setQuestion({...question, option3: event.target.value})}} class="form-control" placeholder="Option C" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                <span class="input-group-text fw-semibold" id="basic-addon1">D</span>
                <input type="text" onChange={(event)=>{setQuestion({...question, option4: event.target.value})}} class="form-control" placeholder="Option D" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <ul class="list-group list-group-horizontal d-flex justify-content-center">
                    <span class="input-group-text mx-2 bg-success text-white fw-semibold" id="basic-addon1">Correct Option</span>
                    <button onClick={()=>{setQuestion({...question, correct_option: 'a'})}} class={`list-group-item ${question.correct_option === 'a' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>Option A</button>
                    <button onClick={()=>{setQuestion({...question, correct_option: 'b'})}} class={`list-group-item ${question.correct_option === 'b' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>Option B</button>
                    <button onClick={()=>{setQuestion({...question, correct_option: 'c'})}} class={`list-group-item ${question.correct_option === 'c' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>Option C</button>
                    <button onClick={()=>{setQuestion({...question, correct_option: 'd'})}} class={`list-group-item ${question.correct_option === 'd' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>Option D</button>
                </ul>
                <div className='d-flex justify-content-evenly my-3'>
                <ul class="list-group list-group-horizontal d-flex justify-content-center">
                    <span class="input-group-text mx-2 bg-dark text-white fw-semibold" id="basic-addon1">Difficulty</span>
                    <button onClick={()=>{setQuestion({...question, question_difficulty: 'Easy'})}} class={`list-group-item ${question.question_difficulty === 'Easy' ? 'bg-success text-white' : 'bg-white text-success'}`}>Easy</button>
                    <button onClick={()=>{setQuestion({...question, question_difficulty: 'Medium'})}} class={`list-group-item ${question.question_difficulty === 'Medium' ? 'bg-warning text-white' : 'bg-white text-warning'}`}>Medium</button>
                    <button onClick={()=>{setQuestion({...question, question_difficulty: 'Hard'})}} class={`list-group-item ${question.question_difficulty === 'Hard' ? 'bg-danger text-white' : 'bg-white text-danger'}`}>Hard</button>
                </ul>
                <div class="dropdown">
                    <button id='subject_name_display' class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Subject
                    </button>
                    <ul class="dropdown-menu">
                        {
                            subjects.map((subject, index)=>(
                                <li 
                                    className='dropdown-item'
                                    key={subject.subject_id}
                                    onClick={
                                        ()=>{
                                            setQuestion({...question, subject_id: subject.subject_id, subject_name: subject.subject_name});
                                            const subjectDisplay = document.getElementById('subject_name_display');
                                            subjectDisplay.textContent = subject.subject_name;
                                        }}>
                                    {subject.subject_name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                </div>
            </div>
            <div className='mb-3 bg-dark-subtle' style={separator}></div>
            <div className='d-flex justify-content-center'>
                <button onClick={openConfirmationBox} className="btn btn-outline-success fw-semibold">Add Question</button>
            </div>
            <p id='message' className={`d-flex justify-content-center ${messageClass}`}></p>
            <div className='modal' tabIndex='-1' role='dialog' style={{ display: isConfirmationBoxVisible ? 'block' : 'none' }}>
                    <div className="modal-dialog" role='document'>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Question</h5>
                                <button type="button" className="btn btn-danger" onClick={closeConfirmationBox} aria-label="Close">&times;</button>
                            </div>
                            <div className="modal-body d-block">
                                    <p className='fw-medium'>Question ID: <span className='fw-normal'>{`${question.question_id}`}</span></p>
                                    <p className='fw-medium'>Question: <span className='fw-normal'>{`${question.question_text}`}</span></p>
                                    <p className='fw-medium'>Option A: <span className='fw-normal'>{`${question.option1}`}</span></p>
                                    <p className='fw-medium'>Option B: <span className='fw-normal'>{`${question.option2}`}</span></p>
                                    <p className='fw-medium'>Option C: <span className='fw-normal'>{`${question.option3}`}</span></p>
                                    <p className='fw-medium'>Option D: <span className='fw-normal'>{`${question.option4}`}</span></p>
                                    <p className='fw-medium'>Correct Option: <span className='fw-normal'>{`${question.correct_option}`}</span></p>
                                    <p className='fw-medium'>Difficulty: <span className='fw-normal'>{`${question.question_difficulty}`}</span></p>
                                    <p className='fw-medium'>Subject ID: <span className='fw-normal'>{`${question.subject_id}`}</span></p>
                                    <p className='fw-medium'>Subject: <span className='fw-normal'>{`${question.subject_name}`}</span></p>
                                    <p className='d-flex justify-content-center fw-semibold'>Are you sure you want to add this question?</p>
                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button type='button' onClick={closeConfirmationBox} className="btn btn-secondary">Cancel</button>
                                <button type='button' onClick={submitQuestionAfterConfirmation} className="btn btn-success">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
      </div>
    </Layout>
  )
}
