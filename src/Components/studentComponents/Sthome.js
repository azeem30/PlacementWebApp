import React from 'react'
import Layout from '../Layout';
import { Link } from 'react-router-dom';

export default function Sthome() {
    let imageStyle = {
      borderBottom: '1px solid black'
    };
    let cardStyle = {
        width: '18rem',
        positon: 'absolute',
        top: '20px',
    };
  return (
    <Layout>
      <div className='d-flex justify-content-evenly'>
        <div className="card text-center mb-3 border border-danger border-2" style={cardStyle}>
        <img style={imageStyle} src="https://www.teachingenglish.org.uk/sites/teacheng/files/styles/wide/public/images/teens_and_exams_iStock_000005780399XSmall_0.jpg?itok=ElZYWt14" className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Give Tests!</h5>
                <p className="card-text">Get stronger and prepare yourself for the final aptitude.</p>
                <Link to="/pending_tests" className="btn btn-info fw-semibold border border-primary">Give Tests</Link>
            </div>
        </div>
        <div className="card text-center mb-3 border border-danger border-2" style={cardStyle}>
        <img style={imageStyle} src="https://img.paperform.co/fetch/f_jpg,w_1800/https://s3.amazonaws.com/paperform-blog/2020/12/How-To-Analyze-Survey-Results.png" className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Analyze your Results!</h5>
                <p className="card-text">See where you lack and improve your performances.  </p>
                <a href="#" className="btn btn-info fw-semibold border border-primary">Check Scores</a>
            </div>
        </div>
      </div>  
    </Layout>
  )
}
