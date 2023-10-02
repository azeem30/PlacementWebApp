import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom'
import Layout from '../commonComponents/Layout'
import axios from 'axios';

export default function Questions() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const testJSON = queryParams.get('data');
  const test = JSON.parse(decodeURIComponent(testJSON));
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  useEffect(()=>{fetchQuestions();}, []);
  let placingContainer = {
    position: 'absolute',
    top: '20%',
    left: '5%',
    width: '60%',
    height: '268px'
  }  
  let timerStyle = {
    width: '70px',
    height:'30px',
    fontSize: '16px',
    marginTop: '10px'
  }
  let detailContainer = {
    height: '50px',
    width: '100%',
  }
  let detailStyle = {
    marginTop: '12px'
  }
  async function fetchQuestions(){
    try{
      console.log(test);
      const response = await axios.post('http://localhost:9999/questions', {test});
      if(response.status===200){
        console.log(response.data.questions);
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
          <p className='fw-semibold text-wrap w-100'>Question</p>
        </div>
        <div className='border border-warning-subtle'>
          <ul className="list-group">
              <li className="list-group-item">
                  <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="firstRadio" />
                  <label className="form-check-label text-wrap" for="firstRadio">Option 1</label>
              </li>
              <li className="list-group-item">
                  <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="secondRadio" />
                  <label className="form-check-label text-wrap" for="secondRadio">Option 2</label>
              </li>
              <li className="list-group-item">
                  <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="thirdRadio" />
                  <label className="form-check-label text-wrap" for="thirdRadio">Option 3</label>
              </li>
              <li className="list-group-item">
                  <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="fourthRadio" />
                  <label className="form-check-label text-wrap" for="fourthRadio">Option 4</label>
              </li>
          </ul>
        </div>
        <div className='d-flex justify-content-around'>
              <button className='btn btn-primary border border-dark my-2'>Previous</button>
              <div className='badge text-bg-danger fw-normal text-wrap display-6 border border-dark' style={timerStyle}>0:00</div>
              <button className='btn btn-primary border border-dark my-2'>Next</button>
          </div>
      </div>
    </Layout>
  )
}
