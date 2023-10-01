import React from 'react'

export default function Navbar(props) {
  let navStyle = {
    borderBottom: '1px solid black'
  }
  let dropdownStyle = {
    marginTop: '2px'
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success opacity-75" style={navStyle}>
        <div className="container-fluid">
            <a className="navbar-brand text-white" href="#">{props.title}</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link active text-white" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item mx-2">
                    <a className="nav-link text-white" href="#">About</a>
                    </li>
                    <li className="nav-item mx-2">
                    <a className="nav-link text-white" href="#">Pricing</a>
                    </li>   
                </ul>
            </div>
        </div>
      </nav>
    </div>
  )
}