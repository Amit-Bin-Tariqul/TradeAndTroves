import React, { useState } from 'react';
import LoginPage from './LoginPage'; // Import the LoginPage component
import SignUpForm from './SignUpForm'; // Use capital "S" in the import
 // Import the SignUpForm component
import './TogglePage.css'; // Import the CSS for styling


const TogglePage2 = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <>
    <div className="toggle-page">
      {/* <div className="toggle-buttons">
        <button className={`toggle-button ${!showSignUp ? 'active' : ''}`} onClick={() => setShowSignUp(false)}>Login</button>
        <button className={`toggle-button ${showSignUp ? 'active' : ''}`} onClick={() => setShowSignUp(true)}>Sign Up</button>
      </div> */}
      <p>Please LogIn or Sign Up for this feature</p>
      <div className="form-container">
        {showSignUp ? <SignUpForm /> : <LoginPage />}
        {showSignUp ? (
          <p className='toggle-text'>Already have an account? <button className="toggle-link" onClick={toggleForm}>Login</button></p>
        ) : (
          <p className='toggle-text'>Don't have an account? <button className="toggle-link" onClick={toggleForm}>Sign Up</button></p>
        )}
      </div>
    </div>
    </>
  );
};

export default TogglePage2;
