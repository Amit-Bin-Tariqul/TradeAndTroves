import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [nid, setNid] = useState('123');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (nid && email && phone && password && userType) {
      console.log("all are filled up");
      const utype = userType === 'buyer' ? 1 : 0;

      try {
        const response = await axios.post('http://localhost:3002/SignUpForm', {
          username_: username,
          nid_: nid,
          address_: address,
          email_: email,
          phone_: phone,
          utype_: utype,
          password_: password,
        });

        console.log(response.data.message);
        navigate('/LoginPage'); // Use useNavigate for navigation
      } catch (err) {
        if (err.response && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError('Already registered with NID, Phone, E-mail');
        }
        console.error(err);
      }
    } else {
      console.log('Please fill in all required fields');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-4 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-500">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                className="w-96 h-10 border rounded-lg p-2 focus:ring focus:ring-indigo-200"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {/* <div>
              <input
                type="number"
                className="w-full h-10 border rounded-lg p-2 focus:ring focus:ring-indigo-200"
                placeholder="National ID (NID)"
                value={nid}
                onChange={(e) => setNid(e.target.value)}
                required
              />
            </div> */}
            <div>
              <input
                type="text"
                className="w-full h-10 border rounded-lg p-2 focus:ring focus:ring-indigo-200"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                className="w-full border rounded-lg p-2 focus:ring focus:ring-indigo-200"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="tel"
                className="w-full border rounded-lg p-2 focus:ring focus:ring-indigo-200"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <select
                className="w-full border rounded-lg p-2 focus:ring focus:ring-indigo-200"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="">Select User Type</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <div>
              <input
                type="password"
                className="w-full border rounded-lg p-2 focus:ring focus:ring-indigo-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Password must be at least 8 characters long and contain at least one number, one lowercase, and one uppercase letter."
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full border rounded-lg p-2 focus:ring focus:ring-indigo-200"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="error-message text-red-600">{error}</div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;