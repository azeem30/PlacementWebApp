import React from 'react'
import Layout from '../Layout'

export default function Tests() {
    const pendingTestsData = [
        {title: 'Title1', marks: '100', duration: '60 minutes'}, 
        {title: 'Title2', marks: '100', duration: '60 minutes'}, 
        {title: 'Title3', marks: '100', duration: '60 minutes'}
    ]
    let testListCardStyle = {
        width: '18rem'
    }
    let containerStyle = {
        position:'relative',
        top: '4%'
    }
    let separator = {
        height: '0.5px',
        marginTop: '2px',
        marginBottom: '15px'
    }
    let startButtonStyle ={
        width: '60px',
        height: '40px',
        marginTop: '8px'
    }
  return (
    <Layout>
        <div className="container d-flex justify-content-center" style={containerStyle}>
            <div class="card w-75" style={testListCardStyle}>
                <div class="card-body">
                    <div className='d-flex justify-content-center'>
                        <h4 class="card-title">Pending Tests</h4>
                    </div>
                    <div className='bg-secondary' style={separator}></div>
                    <div className='mb-3'>
                        <ol class="list-group">
                            {pendingTestsData.map((test, index)=>(
                                <div className='d-flex justify-content-evenly' key={index}>
                                    <li className='d-flex w-75 my-1 justify-content-between text-wrap rounded-start border border-success-subtle list-group-item'>
                                        <p className='fw-semibold text-wrap'>{test.title}</p>
                                        <p>Marks: <span className='fw-semibold'>{test.marks}</span></p>
                                        <p>Duration: <span className='fw-semibold'>{test.duration}</span></p>
                                    </li>
                                    <button className='btn btn-success' style={startButtonStyle}>Start</button>
                                </div>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}
