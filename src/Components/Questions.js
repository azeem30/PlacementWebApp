import React, {useState} from 'react'

export default function Questions() {
  let placingContainer = {
    position: 'absolute',
    top: '12%',
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
  const [question, setQuestion] = useState('The question will be here.');
  const [options, setNewOptions] = useState(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
  return (
    <div className="container bg-info-subtle rounded border border-primary-subtle" style={placingContainer}>
      <div className='mx-1 my-2'>
        <p className='fw-semibold text-wrap w-100'>{question}</p>
      </div>
      <div className='border border-warning-subtle'>
        <ul className="list-group">
            <li className="list-group-item">
                <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="firstRadio" />
                <label className="form-check-label text-wrap" for="firstRadio">{options[0]}</label>
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="secondRadio" />
                <label className="form-check-label text-wrap" for="secondRadio">{options[1]}</label>
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="thirdRadio" />
                <label className="form-check-label text-wrap" for="thirdRadio">{options[2]}</label>
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="fourthRadio" />
                <label className="form-check-label text-wrap" for="fourthRadio">{options[3]}</label>
            </li>
        </ul>
      </div>
      <div className='d-flex justify-content-around'>
            <button className='btn btn-primary border border-dark my-2' onClick={()=>{setQuestion('This is the previous question.')}}>Previous</button>
            <div className='badge text-bg-danger fw-normal text-wrap display-6 border border-dark' style={timerStyle}>0:00</div>
            <button className='btn btn-primary border border-dark my-2' onClick={()=>{setQuestion('This is the next question.')}}>Next</button>
        </div>
    </div>
  )
}
