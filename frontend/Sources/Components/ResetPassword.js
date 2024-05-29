import React, { useState } from 'react';
import './ForgetPass.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 



const ResetPassword = () => {
  
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const navigate=useNavigate();
 
  
  const handleResetPass = async (e) => {
    e.preventDefault();
   

    if ( password && password2) {
      console.log("all are filled up");
    

      try {
        const response = await axios.post('http://localhost:3002/ResetPassword', {
          password_: password,
          password2_:password2,
        });

        if (response.status === 200) {

          navigate('/Home');
        }
        
      } catch (err) {
        
      }
     
    } else {
      console.log('Please fill in all required fields');
    }
  };




    return (
        
      <div class="toggle-page">
        <div className="form-container">
            <div className="login-container">
        <h2>Set Password</h2>
        <form >
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter."
          
              required
            />
           
            {/* //run na hole cmnt */}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter."
              autoComplete="email"
            />
            {/* {errors.password && <span className='text-danger'>{errors.password}</span>} */}
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleResetPass}>Done</button>
          {/* <div className="toggle-form">
            <p>Don't have an account? <button type="button" onClick={handleSignUp}>Sign Up</button></p>
          </div> */}
    
           
            {/* --edike ekta forget password page ashbe jetay dhukle email dibi otp pathabe email e otp dile .ekhn otp ta temporarily ekta variable e rakhbo database e store korar drkr nai.otp match hole new pass caibo and confirm new pass caibo.korle database e update kore dibo.ebong just Login page e pathay dibo */}
         
        </form>
      </div>
        </div>


      </div>
        
        
    
    );
  };
  
  export default ResetPassword;
  