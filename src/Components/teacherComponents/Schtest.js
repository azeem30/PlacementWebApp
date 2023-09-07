import React from 'react'
import Layout from '../Layout'

export default function Schtest() {
    const scheduleFormStyle = {
        positon: 'relative',
        top: '6%'
    }
    const separator = {
        height: '0.5px'
    }
    const departmentStyle ={
       marginTop: '1px', 
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
    const department = 'I.T.';
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
                    <input type="text" className="form-control" id="testTitleInput" style={textInputStyle}/>
                </div>
                <div className='mb-3'>
                    <label for="testMarksInput" className="form-label fw-semibold">Marks</label>
                    <input type="text" className="form-control" id="testMarksInput"/>
                </div>
                <div className="btn-group dropdown h-25" style={durationStyle}>
                        <button type="button" className="btn btn-success border border-dark-subtle dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Duration
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">60 minutes</a></li>
                            <li><a className="dropdown-item" href="#">120 minutes</a></li>
                        </ul>
                </div>
                </div>
                <div className='d-flex justify-content-around' style={bottomDiv}>
                    <div className="dropdown">
                        <button className="btn btn-outline-success text-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Subject
                        </button>
                        <ul className="dropdown-menu">
                            <li><a id='subject_dsa' className="dropdown-item" href="#">DSA</a></li>
                            <li><a id='subject_dbms' className="dropdown-item" href="#">DBMS</a></li>
                            <li><a id='subject_java' className="dropdown-item" href="#">Java</a></li>
                            <li><a id='subject_py' className="dropdown-item" href="#">Python</a></li>
                            <li><a id='subject_os' className="dropdown-item" href="#">OS</a></li>
                        </ul>
                    </div>
                    <div style={difficultyStyle}>
                    <ul className="list-group list-group-horizontal">
                        <li className="list-group-item bg-success text-white border border-dark" id="d_simple">Simple</li>
                        <li className="list-group-item bg-warning text-dark border border-dark" id="d_medium">Medium</li>
                        <li className="list-group-item bg-danger text-white border border-dark" id="d_hard">Hard</li>
                        <li className="list-group-item bg-dark text-white border border-dark" id="d_combined">Combined</li>
                    </ul>
                    </div>
                    <div style={departmentStyle}> 
                        <p className='fs-4 fw-normal text-info-emphasis' style={departmentStyle}>Department: <p className='fst-normal text-dark d-inline text-wrap'>{department}</p></p>
                    </div>
                </div>
                <div className='mt-3 bg-dark-subtle' style={separator}></div>
                <div className="d-flex justify-content-center mt-3">
                    <button type="button" className="btn btn-outline-success fw-semibold">Schedule Test</button>
                </div>
            </div>
        </div>
    </Layout>
  )
}
