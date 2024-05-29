import React, { useState, useEffect } from 'react';
import './ForgetPass.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConfirmOTP = () => {
  const [otp, setOTP] = useState('');
  const [timer, setTimer] = useState(300); // Initial timer value in seconds (e.g., 5 minutes)
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  useEffect(() => {
    // Create a timer that counts down from 5 minutes (300 seconds)
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        // Timer has expired, navigate back to the ForgetPass page
        clearInterval(countdown);
        navigate('/ForgetPass'); // Replace with the actual route
      }
    }, 1000); // Update the timer every 1 second

    // Cleanup the timer when the component unmounts
    return () => clearInterval(countdown);
  }, [timer, navigate]);

  const handleNewPassWord = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/ConfirmOTP', {
        otp_: otp,
      });

      if (response.status === 200) {

        navigate('/ResetPassword');
      } else {
  
        console.log(response.data); 
        setErrorMessage('OTP doesn\'t match. Please try again.');
      }
    } catch (error) {
      
      console.error('Error:', error);
    }
  };

  return (
    <div className="toggle-page">
      <div className="form-container">
        <div className="login-container">
          <h2>Confirm OTP</h2>
          <p style={{ color: 'red', fontSize: '14px' }}>Time remaining: {timer} seconds</p>
          {/* Display the timer with red color and smaller font size */}
          
          {/* Display the error message if it's not empty */}
          {errorMessage && (
            <p style={{ color: 'red' }}>{errorMessage}</p>
          )}

          <form onSubmit={handleNewPassWord}>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
              />
            </div>

            <div className="forgot-password">
              <button type="submit" className="btn btn-primary" onClick={handleNewPassWord}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOTP;
