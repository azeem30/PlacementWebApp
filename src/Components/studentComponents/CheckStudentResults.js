import React,{ useState, useEffect } from 'react'
import Layout from '../commonComponents/Layout'
import { getStudentDetails } from './Stlogin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CheckStudentResults() {
    useEffect(() => { getTestResults(); }, []);
    const [testResults, setTestResults] = useState([]);
    const navigate = useNavigate();
    let containerStyle = {
        position: 'relative',
        top: '3%',
        width:'80%'
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

    async function getTestResults() {
        try {
            const studentDetails = getStudentDetails();
            const si = studentDetails.studentInfo;
            const response = await axios.post('http://localhost:9999/get_test_results', { si });
            if (response.status === 200) {
                console.log(response.data.testResults)
                setTestResults(response.data.testResults);
            } else {
                console.log('Failed to get data');
            }
        } catch(error){
            if (error.response) {
                console.error('Server responded with status:', error.response.status);
                console.error('Response data:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    }

    return (
        <Layout>
            <div style={containerStyle} className="container rounded w-100 bg-white">
                <div className="d-flex justify-content-around">
                    <h4 style={headerStyle} className="card-title">Submitted Tests</h4>
                    <div className="btn-group my-2" style={buttonStyle}>
                        <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Subjects
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">D.S.A</a></li>
                            <li><a className="dropdown-item" href="#">D.B.M.S</a></li>
                            <li><a className="dropdown-item" href="#">Java</a></li>
                            <li><a className="dropdown-item" href="#">Python</a></li>
                            <li><a className="dropdown-item" href="#">OS</a></li>
                            <li><a className="dropdown-item" href="#">Aptitude</a></li>
                        </ul>
                    </div>
                    <div className="btn-group my-2" style={buttonStyle}>
                        <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort by
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Date</a></li>
                        </ul>
                    </div>
                </div>
                <div className="bg-secondary" style={separator}></div>
                <div className="list-group">
                    {testResults.map((result, index) => (
                        <div className='d-flex justify-content-evenly' key={index}>
                            <li className='d-flex w-100 my-2 justify-content-between text-wrap rounded border border-success-subtle list-group-item'>
                                <p className='my-2'>Title: <span className='fw-semibold'>{result.title}</span></p>
                                <p className='my-2'>Marks: <span className='fw-semibold'>{result.marks}</span></p>
                                <p className='my-2'>Duration: <span className='fw-semibold'>{`${result.duration} minutes`}</span></p>
                                <p className='my-2'>Difficulty: <span className='fw-semibold'>{result.difficulty}</span></p>
                                <p className='my-2'>Subject name: <span className="fw-semibold">{result.subject_name}</span></p>
                                <p className='my-2'>Marks Obtained: <span className="fw-semibold">{result.marks_scored}</span></p>
                                <p className='my-2'>Percentage: <span className="fw-semibold">{result.percentage}</span></p>
                                <button  >Detailed Result</button>
                            </li>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
