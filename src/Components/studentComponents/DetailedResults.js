import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../commonComponents/Layout'
import { getStudentDetails } from './Stlogin';
import Navbar from '../commonComponents/Navbar';
import axios from 'axios';

export default function DetailedResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const testJSON = queryParams.get('data');
  const test = JSON.parse(decodeURIComponent(testJSON));
  
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

  return (
    <Layout>
      <Navbar title='AptiPro' isLoggedIn={true} componentName='DetailedResults' />
      <div style={detailContainer} className='bg-warning-subtle border-bottom border-warning'>
        <div className="d-flex justify-content-evenly">
          <p style={detailStyle} className='mx-3'>Title: <span className='fw-semibold'></span></p>
          <p style={detailStyle} className='mx-3'>Marks: <span className='fw-semibold'></span></p>
          <p style={detailStyle} className='mx-3'>Duration: <span className='fw-semibold'></span></p>
          <p style={detailStyle} className='mx-3'>Difficulty: <span className='fw-semibold'></span></p>
          <p style={detailStyle} className='mx-3'>Subject: <span className="fw-semibold"></span></p>
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
              <button className='btn btn-primary border border-dark my-2'>Next</button>
          </div>
      </div>
    </Layout>
  )
}
