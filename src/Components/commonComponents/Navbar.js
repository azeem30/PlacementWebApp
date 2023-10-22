import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(props) {
  let imageStyle = {
    width: '30px',
    height: '30px'
  }
  let logoutStyle ={
    marginLeft: '1150px'
  }
  let navStyle = {
    borderBottom: '0.5px solid black'
  }
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    setLogoutOpen(true);
  }
  const closeLogoutModal = () =>{
    setLogoutOpen(false);
  }
  const handleConfirmLogout = () =>{
    navigate('/');
  }
  const handleHomeClick = () =>{
    const studentComponentNames = ['Sthome', 'Tests', 'Questions'];
    const teacherComponentNames = ['Tchome', 'Schtest', 'AddQuestions'];
    const commonComponentNames = ['Choice'];
    if(studentComponentNames.includes(props.componentName) && props.isLoggedIn === true){
      navigate('/student_home');
    }
    else if(teacherComponentNames.includes(props.componentName) && props.isLoggedIn === true){
      navigate('/teacher_home');
    }
    else if(commonComponentNames.includes(props.componentName) && props.isLoggedIn === false){
      navigate('/choice_page');
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success opacity-75" style={navStyle}>
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            {props.title}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item my-2">
                <button onClick={handleHomeClick} className="nav-link active text-white" aria-current="page">
                  Home
                </button>
              </li>
              <li className="nav-item mx-2 my-2">
                <a className="nav-link text-white" href="#">
                  About
                </a>
              </li>
              <li className="nav-item mx-1 my-2">
                <a className="nav-link text-white" href="#">
                  Pricing
                </a>
              </li>
              {props.isLoggedIn && ( 
                <li style={logoutStyle} className="nav-item my-1">
                  <button className="nav-link text-white" onClick={handleLogoutClick}>
                    <img className='rounded' style={imageStyle} src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-logout-icon-png-image_956410.jpg" alt="logout" />
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <div
        className={`modal ${isLogoutOpen ? 'show' : ''}`}
        tabIndex="-1"
        style={{ display: isLogoutOpen ? 'block' : 'none' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Logout Confirmation</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeLogoutModal}
              ></button>
            </div>
            <div className="modal-body fw-semibold d-flex justify-content-center">
              Are you sure you want to logout?
            </div>
            <div className="modal-footer d-flex justify-content-around">
              <button
                type="button"
                className="btn btn-danger"
                onClick={closeLogoutModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleConfirmLogout}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
