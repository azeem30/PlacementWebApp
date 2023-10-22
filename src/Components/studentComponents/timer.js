import React, { useState, useEffect } from 'react';

function CountdownTimer(props) {
  const [timeInSeconds, setTimeInSeconds] = useState(props.initialTime);
  const [timerExpired, setTimerExpired] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  let timerStyle = {
    width: '70px',
    height:'30px',
    fontSize: '16px',
    marginTop: '10px'
  }
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeInSeconds > 0) {
        setTimeInSeconds(timeInSeconds - 1);
      }
      else{
        clearInterval(timerInterval);
        setTimerExpired(true);
        setShowAlert(true);
        if(props.onTimerExpiration){
          props.onTimerExpiration();
        }
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [timeInSeconds]);

  // Format the remaining time as MM:SS
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <>
    <div style={timerStyle} className='badge text-bg-danger fw-normal text-wrap display-6 border border-dark'>
      {formattedTime}
    </div>
    {showAlert && (
      <div className="alert alert-danger mt-3" role="alert">
        Time's up! Your test has ended.
      </div>
    )}
    </>
  );
}

export default CountdownTimer;