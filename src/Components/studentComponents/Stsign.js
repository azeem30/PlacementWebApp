import React, {useState} from 'react'
import Layout from '../Layout'

export default function Stsign() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [results, setResults] = useState([
    { sem: 1, sgpi: '', cgpi: '', required: true},
    { sem: 2, sgpi: '', cgpi: '', required: true},
    { sem: 3, sgpi: '', cgpi: '', required: false},
    { sem: 4, sgpi: '', cgpi: '', required: false},
    { sem: 5, sgpi: '', cgpi: '', required: false},
    { sem: 6, sgpi: '', cgpi: '', required: false},
    { sem: 7, sgpi: '', cgpi: '', required: false},
    { sem: 8, sgpi: '', cgpi: '', required: false},
  ]);
  function calcCGPI(sgpi){
    return sgpi*10;
  }
let signCardStyle = {
    position: 'relative',
    top: '4%'
}
let signButtonStyle ={
    marginTop: '30px',
}
let belowSeparator={
    height:'0.5px',
    marginTop: '20px'
}
let aboveSeparator={
    height:'0.5px',
    marginTop: '5px'
}
let departmentDropdownStyle = {
  marginTop: '30px',
  marginRight: '40px'
}
  return (
    <Layout>
      <div className="container w-25 card border border-dark-subtle" style={signCardStyle}>
        <div className="card-body">
            <div className='d-flex justify-content-center'>
                <h4>Student Signup</h4>
            </div>
            <div className='border border-secondary' style={aboveSeparator}></div>
            <div className="mt-3 mb-3">
                <label for="studentSignRollNo" className="form-label">Roll No.</label>
                <input type="text" className="form-control" id="studentSignRollNo" onChange={(event) => {setId(event.target.value);}} required/>
            </div>
            <div className="mb-3">
                <label for="studentSignPassword" className="form-label">Password</label>
                <input type="password" id="studentSignPassword" onChange={(event)=>{setPassword(event.target.value);}} required className="form-control" aria-describedby="passwordHelpBlock"/>
            </div>
            <div className="dropdown" style={departmentDropdownStyle}>
              <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {department || 'Department'}
              </button>
              <ul className="dropdown-menu">
                <li><a id="cs" onClick={()=>{setDepartment('Computer Science')}} className="dropdown-item" href="#">Computer Science</a></li>
                <li><a id="it" onClick={()=>{setDepartment('I.T.')}} className="dropdown-item" href="#">I.T.</a></li>
                <li><a id="elect" onClick={()=>{setDepartment('Electrical')}} className="dropdown-item" href="#">Electrical</a></li>
                <li><a id="extc" onClick={()=>{setDepartment('EXTC')}} className="dropdown-item" href="#">EXTC</a></li>
                <li><a id="mech" onClick={()=>{setDepartment('Mechanical')}} className="dropdown-item" href="#">Mechanical</a></li>
              </ul>
            </div>
            <div className='border border-secondary' style={belowSeparator}></div>
              <div className='d-flex justify-content-center mt-4'>
                  <h4>Results</h4>
              </div>
            {results.map((result) => (
            <table className='table table-bordered border-dark-subtle'>
            <tr className='mx-2' key={result.sem}>
              <th scope="row">{result.sem}</th>
              <td>
                <input
                    className="form-control my-1 mx-1"
                    type="text"
                    aria-label={`Semester ${result.sem} SGPI`}
                    placeholder='SGPI'
                    value={result.sgpi}
                    onChange={(e) =>{
                      const sgpi = e.target.value;
                      const cgpi = calcCGPI(parseFloat(sgpi))
                      setResults((prevResults) =>
                        prevResults.map((prevResult) =>
                          prevResult.sem === result.sem
                            ? { ...prevResult, sgpi, cgpi}
                            : prevResult  
                        )
                      )
                    }}
                    required={result.required}/></td>
                <td>
                  <input
                    className="form-control my-1 mx-1"
                    type="text"
                    aria-label={`Semester ${result.sem} CGPI`}
                    value={result.cgpi}
                    placeholder='CGPI'
                    readOnly
                  />
                </td>
            </tr>
            </table>))}
            <div className='border border-secondary' style={belowSeparator}></div>
            <div className="d-flex justify-content-center" style={signButtonStyle}>
                <button type="button" className="btn btn-outline-success">Register</button>
            </div>
        </div>
    </div>
    </Layout>
  )
}
