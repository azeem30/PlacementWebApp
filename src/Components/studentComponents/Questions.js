import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../commonComponents/Layout'
import axios from 'axios';
import CountdownTimer from './timer';
import { getStudentDetails } from './Stlogin'

export default function Questions() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const testJSON = queryParams.get('data');
  const test = JSON.parse(decodeURIComponent(testJSON));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [userSelectedOptions, setUserSelectedOptions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);
  const [isConfirmationBoxVisible, setConfirmationBoxVisible] = useState(false);

  useEffect(()=>{
    const fetchQuestions = async () => {
      try{
        const response = await axios.post('http://localhost:9999/questions', {test});
        if(response.status===200){
          const questions = response.data.questions;
          const shuffledQuestions = shuffleArray(questions);
          setFetchedQuestions(questions);
          setRandomizedQuestions(shuffledQuestions);
          setUserSelectedOptions(new Array(fetchedQuestions.length).fill({question_id: null, question_text: '', option_key: '', selected_option: ''}));
        }
        else{
          console.log('Failed to get data');
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
    }
    fetchQuestions();
  },[]);
  const submitResponse = () => {
    setIsLoading(true);
    const studentDetails = getStudentDetails();
    const si = studentDetails.studentInfo;
    let marks = 0.00;
    for (let i = 0; i < fetchedQuestions.length; i++){
      const fetchedQuestion = fetchedQuestions[i];
      const userSelectedOption = userSelectedOptions.find((option)=> option.question_id === fetchedQuestion.question_id);
      if(userSelectedOption){
        if(fetchedQuestion.correct_option === 'a' && userSelectedOption.option_key === 'option1'){
          marks += 3.33;
        }
        else if(fetchedQuestion.correct_option === 'b' && userSelectedOption.option_key === 'option2'){
          marks += 3.33;
        }
        else if(fetchedQuestion.correct_option === 'c' && userSelectedOption.option_key === 'option3'){
          marks += 3.33;
        }else if(fetchedQuestion.correct_option === 'd' && userSelectedOption.option_key === 'option4'){
          marks += 3.33;
        }
      }
    }
    const testResponse = {
      response_id: test.test_id,
      response_data: userSelectedOptions,
      marks_scored: marks,
      total_marks: test.test_marks,
      percentage: `${(marks / test.test_marks * 100)} %`,
      student_id: si.roll_no,
      teacher_id: test.teacher_email
    }
    axios.post('http://localhost:9999/submit_response', {testResponse}).
    then((response)=>{
      setIsLoading(false);
      setResponseMessage('Test Submitted Successfully!')
    }).
    catch((error)=>{
      setIsLoading(false);
      if (error.response) {
        setResponseMessage(`Server Error: ${error.response.data}`);
      } else if (error.request) {
        setResponseMessage(`No response received from the server`);
      } else {
        setResponseMessage(`Request Error: ${error.message}`);
      }
    });
  }
  /*useEffect(() => {
    function preventRightClick(event) {
      if (event.button === 2) {
        event.preventDefault();
      }
    }
    window.addEventListener('contextmenu', preventRightClick);
    return () => {
      window.removeEventListener('contextmenu', preventRightClick);
    };
  }, []);*/
  let placingContainer = {
    position: 'absolute',
    top: '20%',
    left: '5%',
    width: '60%',
    minHeigh: '300px',
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none'
  }  
  let detailContainer = {
    height: '50px',
    width: '100%',
  }
  let detailStyle = {
    marginTop: '12px'
  }
  const shuffleArray = (questionArray) =>{
    const shuffledArray = [...questionArray];
    for(let i=shuffledArray.length - 1; i>0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
  const handleOptionSelect = (questionId,questionText, optionIndex, optionText) => {
    const updatedSelectedOptions = [...userSelectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = {
      question_id: questionId,
      question_text: questionText,
      option_key: optionIndex,
      selected_option: optionText
    }
    setUserSelectedOptions(updatedSelectedOptions);
    console.log(userSelectedOptions);
  }
  const handleNextQuestion = () => {
    if(currentQuestionIndex < fetchedQuestions.length - 1){
      setCurrentQuestionIndex(currentQuestionIndex+1);
      setQuestionNumber(questionNumber + 1);
    }
  }
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex-1);
      setQuestionNumber(questionNumber - 1);
    }
  }
  const openConfirmationBox = () => {
    setConfirmationBoxVisible(true);
  };

  const closeConfirmationBox = () => {
    setConfirmationBoxVisible(false);
  };

  const handleSubmit = () => {
    openConfirmationBox(); 
  };
  const submitTestAfterConfirmation = () =>{
    closeConfirmationBox();
    submitResponse();
  }
  return (
    <Layout>
      <div style={detailContainer} className='bg-warning-subtle border-bottom border-warning'>
        <div className="d-flex justify-content-evenly">
          <p style={detailStyle} className='mx-3'>Title: <span className='fw-semibold'>{test.test_title}</span></p>
          <p style={detailStyle} className='mx-3'>Marks: <span className='fw-semibold'>{test.test_marks}</span></p>
          <p style={detailStyle} className='mx-3'>Duration: <span className='fw-semibold'>{`${test.test_duration} minutes`}</span></p>
          <p style={detailStyle} className='mx-3'>Difficulty: <span className='fw-semibold'>{test.test_difficulty}</span></p>
          <p style={detailStyle} className='mx-3'>Date: <span className='fw-semibold'>{test.test_date.slice(0, 10)}</span></p>
          <p style={detailStyle} className='mx-3'>Time: <span className='fw-semibold'>{test.test_time}</span></p>
          <p style={detailStyle} className='mx-3'>Subject: <span className="fw-semibold">{test.subject_name}</span></p>
        </div>
      </div>
      <div className="container bg-info-subtle rounded border border-primary-subtle" style={placingContainer}>
        <div className='mx-1 my-2'>
          <p className='fw-semibold d-flex justify-content-between text-wrap w-100'>{`${questionNumber}. ${randomizedQuestions[currentQuestionIndex]?.question_text}`} <span className={randomizedQuestions[currentQuestionIndex]?.question_difficulty==='Easy'? 'text-success' : randomizedQuestions[currentQuestionIndex]?.question_difficulty === 'Medium' ? 'text-warning' : 'text-danger'}>{randomizedQuestions[currentQuestionIndex]?.question_difficulty}</span></p>
        </div>
        <div className='border border-warning-subtle'>
          <ul className="list-group">
          {['option1', 'option2', 'option3', 'option4'].map((optionKey) => (
            <li className="list-group-item" key={optionKey}>
              <input
                className="form-check-input me-1"
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={optionKey}
                id={`option-${optionKey}`}
                checked={optionKey === userSelectedOptions[currentQuestionIndex]?.option_key}
                onChange={() => {
                  const questionId = randomizedQuestions[currentQuestionIndex].question_id;
                  const questionText = randomizedQuestions[currentQuestionIndex].question_text;
                  const optionText = randomizedQuestions[currentQuestionIndex][optionKey];
                  handleOptionSelect(questionId,questionText, optionKey, optionText);
                 }}
              />
              <label className="form-check-label text-wrap" htmlFor={`option-${optionKey}`}>
                {randomizedQuestions[currentQuestionIndex]?.[optionKey]}
              </label>
            </li>
          ))} 
          </ul>
        </div>
        <div className='d-flex justify-content-around'>
              <button className='btn btn-primary border border-dark my-2' onClick={handlePreviousQuestion}>Previous</button>
              <CountdownTimer initialTime={test.test_duration * 60} /> 
              <button className='btn btn-primary border border-dark my-2' onClick={handleNextQuestion}>Next</button>
              <button disabled={!(currentQuestionIndex === randomizedQuestions.length -1)} onClick={handleSubmit} className="btn btn-success border border-dark my-2">Submit</button>
          </div>
      </div>
      <div className='modal' tabIndex='-1' role='dialog' style={{ display: isConfirmationBoxVisible ? 'block' : 'none' }}>
        <div className="modal-dialog" role='document'>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Scheduling</h5>
              <button type="button" className="btn btn-danger" onClick={closeConfirmationBox} aria-label="Close">&times;</button>
            </div>
            <div className="modal-body d-block">
              <p className='d-flex justify-content-center fw-semibold'>Are you sure you want to submit this test?</p>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button type='button' onClick={closeConfirmationBox} className="btn btn-secondary">Cancel</button>
              <button type='button' onClick={submitTestAfterConfirmation} className="btn btn-success">Confirm</button>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '100%' }}></div>
        </div>
      ) : responseMessage ? (
        <div className={`alert ${responseMessage.includes('Successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {responseMessage}
        </div>
      ) : null}
    </Layout>
  )
}