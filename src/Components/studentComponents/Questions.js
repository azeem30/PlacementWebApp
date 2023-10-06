import React, { useEffect, useState, useRef } from 'react'
import { useLocation} from 'react-router-dom'
import Layout from '../commonComponents/Layout'
import axios from 'axios';
import CountdownTimer from './timer';

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
  useEffect(()=>{
    const fetchQuestions = async () => {
      try{
        const response = await axios.post('http://localhost:9999/questions', {test});
        if(response.status===200){
          const questions = response.data.questions;
          const shuffledQuestions = shuffleArray(questions);
          setFetchedQuestions(questions);
          setRandomizedQuestions(shuffledQuestions);
          setUserSelectedOptions(new Array(fetchedQuestions.length).fill(''));
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
  useEffect(() => {
    function preventRightClick(event) {
      if (event.button === 2) {
        event.preventDefault();
      }
    }
    window.addEventListener('contextmenu', preventRightClick);
    return () => {
      window.removeEventListener('contextmenu', preventRightClick);
    };
  }, []);
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
  const handleOptionSelect = (optionIndex) => {
    const updatedSelectedOptions = [...userSelectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = optionIndex;
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
  return (
    <Layout>
      <div style={detailContainer} className='bg-warning-subtle border-bottom border-warning'>
        <div className="d-flex justify-content-evenly">
          <p style={detailStyle} className='mx-3'>Title: <span className='fw-semibold'>{test.test_title}</span></p>
          <p style={detailStyle} className='mx-3'>Marks: <span className='fw-semibold'>{test.test_marks}</span></p>
          <p style={detailStyle} className='mx-3'>Duration: <span className='fw-semibold'>{`${test.test_duration} minutes`}</span></p>
          <p style={detailStyle} className='mx-3'>Difficulty: <span className='fw-semibold'>{test.test_difficulty}</span></p>
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
                checked={optionKey === userSelectedOptions[currentQuestionIndex]}
                onChange={() => handleOptionSelect(optionKey)}
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
          </div>
      </div>
    </Layout>
  )
}
