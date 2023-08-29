import React from 'react'

export default function TcHome() {
    let teacherHomeStyle = {
        width: '100%',
        height: '44vw'
    };
    let imageStyle = {
        borderBottom: '1px solid black'
    };
    let cardStyle ={
        width: '18rem',
        positon: 'absolute',
        top: '20px',
    };
  return (
    <div className='bg-primary-subtle bg-opacity-25' style={teacherHomeStyle}>
      <div className='d-flex justify-content-evenly'>
        <div className="card text-center mb-3 border border-danger border-2" style={cardStyle}>
        <img style={imageStyle} src="https://cdn.britannica.com/30/220330-050-339CB471/Multiple-Choice-Test-Exam.jpg?w=600&q=60" className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Conduct tests!</h5>
                <p className="card-text">Prepare the students for the final aptitude.</p>
                <a href="#" className="btn btn-info fw-semibold border border-primary">Schedule Test</a>
            </div>
        </div>
        <div className="card text-center mb-3 border border-danger border-2" style={cardStyle}>
        <img style={imageStyle} src="https://img.paperform.co/fetch/f_jpg,w_1800/https://s3.amazonaws.com/paperform-blog/2020/12/How-To-Analyze-Survey-Results.png" className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Analyze the Results!</h5>
                <p className="card-text">See where students lack and improve their performances.</p>
                <a href="#" className="btn btn-info fw-semibold border border-primary">Check Scores</a>
            </div>
        </div>
      </div>  
    </div>
  )
}
