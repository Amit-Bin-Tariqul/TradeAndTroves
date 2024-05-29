import React, { useState } from 'react';
import './ForgetPass.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3002/ForgetPass', {
      email_: email,
    });
    console.log('Before navigation'); 
    navigate('/ConfirmOTP');
    console.log('After navigation'); 
    try {
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="toggle-page">
      <div className="form-container">
        <div className="login-container">
          <h2>Set Password</h2>
          <form>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {errors.message && <span className="text-danger">{errors.message}</span>}
            <button type="button" onClick={handleSendOTP} className="btn btn-primary">
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
