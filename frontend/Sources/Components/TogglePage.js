import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignUpForm from './SignUpForm';

const TogglePage = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="max-w-6xl mx-auto flex">
        <div className="w-3/5 flex">
          <div className="w-full">
            <div className="w-full bg-white  rounded-lg flex-1">
              {showSignUp ? <SignUpForm /> : <LoginPage />}
              <div className="flex justify-center">
                {showSignUp ? (
                  <p className=' text-blue-500'>Already have an account? <button className="toggle-link text-blue-500" onClick={toggleForm}>Login</button></p>
                ) : (
                  <p className=' text-blue-500'>Don't have an account? <button className="toggle-link text-blue-500" onClick={toggleForm}>Sign Up</button></p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 bg-blue-300 p-8 rounded-lg">
          <p className="text-white text-4xl">Welcome to Tradetrove</p>
          
          {showSignUp ? (
            <React.Fragment>
              <p  className="text-white text-xl">Register using your favorite platform</p>
              <div className="social-icons flex">
                <a href="#" className="icon rounded-full p-2 bg-gray-300 m-2"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="icon rounded-full p-2 bg-gray-300 m-2"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="icon rounded-full p-2 bg-gray-300 m-2"><i className="fab fa-github"></i></a>
                <a href="#" className="icon rounded-full p-2 bg-gray-300 m-2"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </React.Fragment>
          ) : (
            <p>Log in to access more features</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TogglePage;
