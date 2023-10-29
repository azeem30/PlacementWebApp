import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../commonComponents/Layout'
import axios from 'axios';
import { getStudentDetails } from './Stlogin'
import Navbar from '../commonComponents/Navbar'

export default function DetailedResults() {
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


  return (
    <Layout>
      <Navbar title='AptiPro' isLoggedIn= {true} componentName='DetailedResults'/>
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

            </li>
          ))} 
          </ul>
        </div>
        <div className='d-flex justify-content-around'>
              <button className='btn btn-primary border border-dark my-2' onClick={handlePreviousQuestion}>Previous</button>
              <button className='btn btn-primary border border-dark my-2' onClick={handleNextQuestion}>Next</button>
          </div>
      </div>

    </Layout>
  )
}