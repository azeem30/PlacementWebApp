import React from 'react'

export default function Questions() {
  let placingContainer = {
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: '60%'
  }  
  let placingNextButton = {
    position: 'relative',
    left: '84%'
  }
  let placingPreviousButton = {
    position: 'relative',
    left: '0'
  }
  return (
    <div className="container bg-info-subtle rounded border border-primary-subtle" style={placingContainer}>
      <div className='mx-1 my-2'>
        <p className='fw-semibold text-wrap w-100'>The Question will be here.</p>
      </div>
      <div className='border border-warning-subtle'>
        <ul className="list-group">
            <li className="list-group-item">
                <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="firstRadio" />
                <label className="form-check-label text-wrap" for="firstRadio">First Option</label>
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="secondRadio" />
                <label className="form-check-label text-wrap" for="secondRadio">Second Option</label>
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="thirdRadio" />
                <label className="form-check-label text-wrap" for="thirdRadio">Third Option</label>
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="fourthRadio" />
                <label className="form-check-label text-wrap" for="fourthRadio">Fourth Option</label>
            </li>
        </ul>
      </div>
      <div>
        <button className="btn btn-primary my-2" style={placingPreviousButton}>Previous</button>
        <button className="btn btn-primary my-2" style={placingNextButton}>Next</button>
      </div>
    </div>
  )
}
