import React from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom'

export default function Choice() {
    let choiceLeftStyle = {
        height: '43vw', 
        borderRight: '2px solid green',
        backgroundImage: 'url("https://www.livemint.com/lm-img/img/2023/09/03/1600x900/School-image_1693713739461_1693713739724.jpg")',
        backgroundSize: 'cover'
    }
    let choiceRightStyle = {
        height: '43vw', 
        backgroundImage: 'url("https://images.livemint.com/img/2022/05/31/600x338/class_1654022648652_1654022654511.jpg")',
        backgroundSize: 'cover'
    }
    let choiceButtonStyle = {
        marginTop: '45%',
        marginLeft: '43%',
        width: '150px'
    }
    let linkStyle = {
        textDecoration: 'none'
    }
  return (
        <div className="d-flex justify-content-center">
            <div class="container w-100" style={choiceLeftStyle}>
                <div class="card-body">
                    <button className="btn btn-success border border-white" style={choiceButtonStyle}><Link style={linkStyle} className="text-white" to="/student_signup">I am a Student</Link></button>
                </div>
            </div>
            <div class="container w-100" style={choiceRightStyle}>
                <div class="card-body">
                <button className="btn btn-success border border-white" style={choiceButtonStyle}><Link style={linkStyle} className='text-white' to="/teacher_signup">I am a Teacher</Link></button>
                </div>
            </div>
        </div>
  )
}
