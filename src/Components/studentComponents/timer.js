import React, { useState, useEffect } from 'react';

function CountdownTimer(props) {
  const [timeInSeconds, setTimeInSeconds] = useState(props.initialTime);
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
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [timeInSeconds]);

  // Format the remaining time as MM:SS
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div style={timerStyle} className='badge text-bg-danger fw-normal text-wrap display-6 border border-dark'>
      {formattedTime}
    </div>
  );
}

export default CountdownTimer;