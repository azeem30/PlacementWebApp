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
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={navStyle}>
        <div className="container-fluid">
            <a className="navbar-brand" href="#">{props.title}</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item mx-2">
                    <a className="nav-link" href="#">About</a>
                    </li>
                    <li className="nav-item mx-2">
                    <a className="nav-link" href="#">Pricing</a>
                    </li>   
                </ul>
                <div className="nav-item dropdown" style={dropdownStyle}>
                <a className="nav-link dropdown-toggle mx-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Select</a>
                    <ul className="dropdown-menu">
                        <li><h6 class="dropdown-header">Where to?</h6></li>
                        <li><a className="dropdown-item" href="#">Tests</a></li>
                        <li><a className="dropdown-item" href="#">Results</a></li>
                    </ul>
                </div>
            </div>
        </div>
      </nav>
    </div>
  )
}
