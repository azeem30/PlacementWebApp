import React, { useState } from 'react'
import Layout from '../Layout'

export default function Tcsign() {
  const [tRoll, setTRoll] = useState('');
  const [tName, setTName] = useState('');
  const [tDepartment, tSetDepartment] = useState('');
  const [tMail, tSetMail] = useState('');
  const [tPassword, tSetPassword] = useState('');
  let signCardStyle = {
    position: 'relative',
    top: '4%'
}
let separator = {
  height: '0.5px',
  marginTop: '5px',
  marginBottom: '10px'
}
let departmentDropdownStyle = {
  marginTop: '30px',
  marginRight: '40px'
}
let signButtonStyle ={
  marginTop: '15px',
}
  return (
    <Layout>
      <div className="container w-25 card border border-dark-subtle" style={signCardStyle}>
        <div className="card-body">
            <div className='d-flex justify-content-center'>
                <h4>Teacher Signup</h4>
            </div>
            <div style={separator} className='bg-secondary'></div>
            <div className="mb-3">
              <label htmlFor="teacherSignRoll" className='form-label'>Roll no.</label>
              <input type="text" id="tecaherSignRoll" onChange={(event)=>{setTRoll(event.target.value)}} className="form-control" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="teacherSignName" className='form-label'>Name</label>
              <input type="text" id="tecaherSignName" onChange={(event)=>{setTName(event.target.value)}} className="form-control" required/>
            </div>
            <div className="mt-2 mb-3">
                <label htmlFor="teacherSignMail" className="form-label">Email</label>
                <input type="email" onChange={(event)=>{tSetMail(event.target.value)}} className="form-control" id="teacherSignMail" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="teacherSignPassword" className="form-label">Password</label>
                <input type="password" id="teacherSignPassword" onChange={(event)=>{tSetPassword(event.target.value)}} required className="form-control" aria-describedby="passwordHelpBlock"/>
            </div>
            <div className="dropdown mb-3" style={departmentDropdownStyle}>
              <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {tDepartment || 'Department'}
              </button>
              <ul className="dropdown-menu">
                <li><a id="cs" onClick={()=>{tSetDepartment('Computer Science')}} className="dropdown-item" href="#">Computer Science</a></li>
                <li><a id="it" onClick={()=>{tSetDepartment('I.T.')}} className="dropdown-item" href="#">I.T.</a></li>
                <li><a id="elect" onClick={()=>{tSetDepartment('Electrical')}} className="dropdown-item" href="#">Electrical</a></li>
                <li><a id="extc" onClick={()=>{tSetDepartment('EXTC')}} className="dropdown-item" href="#">EXTC</a></li>
                <li><a id="mech" onClick={()=>{tSetDepartment('Mechanical')}} className="dropdown-item" href="#">Mechanical</a></li>
              </ul>
            </div>
            <div className='bg-secondary' style={separator}></div>
            <div className="d-flex justify-content-center" style={signButtonStyle}>
                <button type="button" className="btn btn-outline-success">Register</button>
            </div>
        </div>
      </div>
    </Layout>
  )
}
