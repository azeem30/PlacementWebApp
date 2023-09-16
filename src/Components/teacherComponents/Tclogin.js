import React from 'react'
import Layout from '../Layout'
import { Link } from 'react-router-dom'

export default function Tclogin() {
    let logCardStyle = {
        position: 'relative',
        top: '6%'
    }
    let logButtonStyle ={
        marginTop: '30px',
    }
    let extraTextStyle = {
        marginBottom: '0px',
        marginTop: '10px'
    }
    let belowSeparator={
        height:'0.5px',
        marginTop: '20px'
    }
    let aboveSeparator={
        height:'0.5px',
        marginTop: '5px'
    }
  return (
    <Layout>
    <div className="container w-25 card border border-dark-subtle" style={logCardStyle}>
        <div className="card-body">
            <div className='d-flex justify-content-center'>
                <h4>Teacher Login</h4>
            </div>
            <div className='border border-secondary' style={aboveSeparator}></div>
            <div className="mt-3 mb-3">
                <label for="exampleFormControlInputTc" className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleFormControlInputTc" placeholder="name@example.com"/>
            </div>
            <div className="mb-3">
                <label for="inputPasswordTc" className="form-label">Password</label>
                <input type="password" id="inputPasswordTc" className="form-control" aria-describedby="passwordHelpBlock"/>
            </div>
            <div className="d-flex justify-content-center" style={logButtonStyle}>
                <button type="button" class="btn btn-info  border border-primary">Login</button>
            </div>
            <div className='border border-secondary' style={belowSeparator}></div>
            <div className='d-flex justify-content-center'>
                <p className='fw-semibold' style={extraTextStyle}>New Teacher? <Link className='nav-item' to='/teacher_signup'>Signup</Link></p>
            </div>
        </div>
    </div>
    </Layout>
  )
}
