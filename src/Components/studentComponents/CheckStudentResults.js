import React from 'react'
import Layout from '../commonComponents/Layout'

export default function CheckStudentResults() {
    let containerStyle = {
        position: 'relative',
        top: '3%'
    }
    let separator = {
        height: '0.5px',
        marginTop: '3px'
    }
    let buttonStyle = {
        height:'40px'
    }
    let headerStyle = {
        position: 'relative',
        top: '17px',
        left: '-50px'
    }
  return (
    <Layout>
      <div style={containerStyle} className="container rounded w-50 bg-white">
        <div className="d-flex justify-content-around">
            <h4 style={headerStyle} className="card-title">Submitted Tests</h4>
            <div class="btn-group my-2" style={buttonStyle}>
                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Subjects
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">D.S.A</a></li>
                    <li><a class="dropdown-item" href="#">D.B.M.S</a></li>
                    <li><a class="dropdown-item" href="#">Java</a></li>
                    <li><a class="dropdown-item" href="#">Python</a></li>
                    <li><a class="dropdown-item" href="#">OS</a></li>
                    <li><a class="dropdown-item" href="#">Aptitude</a></li>
                </ul>
            </div>
            <div class="btn-group my-2" style={buttonStyle}> 
                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort by
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Date</a></li>
                </ul>
            </div>
        </div>
        <div className="bg-secondary" style={separator}></div>
      </div>
    </Layout>
  )
}
