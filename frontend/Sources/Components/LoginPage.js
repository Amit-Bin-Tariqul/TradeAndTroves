import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/context';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countClick, setCountClick] = useState(0);
  const navigate = useNavigate();
  const { LogIn, usermail } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setCountClick(countClick + 1);

    const loginFlag = await LogIn(email, password);

    if (loginFlag) {
      localStorage.setItem('emailData', email);
      navigate('/Home');
    } else {
      if (countClick <= 2) {
        alert('Wrong Credentials! Try again');
      } else if (countClick > 2) {
        alert("Max attempts reached. Redirecting to Forget Password");
        navigate('/ForgetPass');
      }
    }
  };

  const handleForget = (e) => {
    navigate('/ForgetPass');
  };

  return (
    <div className="login-container mx-auto max-w-xs mt-20">
    <div className='text-center text-2xl text-blue-500 p-2'><b>LOGIN</b></div>


      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="email"
            className="bg-gray-200 rounded w-full p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="bg-gray-200 rounded w-full p-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-4">
            Login
          </button>
          <button className="bg-white text-blue-500 px-4 py-2 rounded" onClick={handleForget}>
            Forget password?
          </button>
        </div>

      </form>
    </div>
  );
};

export default LoginPage;
