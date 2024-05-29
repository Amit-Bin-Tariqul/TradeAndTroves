import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { useAuth } from '../Context/context';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { LogOut, user } = useAuth();
  const getEmail = localStorage.getItem('emailData');
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState('');
  const [uemail, setUmail] = useState(getEmail);
  const [userType, setUserType] = useState(''); 
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [rating, setRating] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    localStorage.setItem('username','TradeAndTroves');
    localStorage.setItem('password','abcd');
    fetchProfileImage(getEmail);
  }, [getEmail]);

  const LogOut2 = () => {
    LogOut();
    navigate('/Home');

  };
  const handleSellProduct = () => {

    navigate('/ProductDataForm');
  };
  const handleRequest= () => {

    navigate('/RequestPage');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('email', uemail);
    console.log(uemail);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const res = await axios.post('/uploadProfileImage', formData, config);
      console.log(res);
    } catch (error) {
      console.error('Error uploading image:', error);
      console.log(error.response.data);
    }
  };

  const handleSetLocation = () => {
    console.log('Set Location clicked');
    navigate('/Location');
  };


  const handleTransactions = () => {
    
    navigate('/TransactionHistory');
  };
  const handleCheckOrders= () => {
    
    navigate('/OrderDetails');
  };



  const navigateToDash=()=>{
    navigate('/Dashboard')
  }
  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(`/getProfileImageName?email=${uemail}`);
      if (response.data.user) {
        const imageUrl = `/uploads/${response.data.user}`;
        console.log(imageUrl);
        setProfileImage(imageUrl);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/getProfile?email=${uemail}`);
      if (response.data.user) {
        setAddress(response.data.user.address);
        setAmount(response.data.user.amount);
        setUserName(response.data.user.username);
        setRating(response.data.user.rating);
        if (response.data.user.usertype === 0) setUserType('admin');
        else setUserType('user');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  
  useEffect(() => {
    fetchProfileImage();
  }, [getEmail, uemail]);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Left Column */}
      <div className="w-1/3 p-8 bg-white">
        <div className="mb-6 relative">
          <div className="w-80 h-80 overflow-hidden rounded-full   mx-16">
            <img
              src={profileImage}
              alt="Profile"
              onClick={() => console.log("Clicked on profile picture")}
              className="cursor-pointer w-full h-full object-cover rounded-full shadow-md"
            />
          </div>
          <label
            className="absolute bottom-0 right-0 p-2 text-center bg-gray-800 text-white rounded-md cursor-pointer"
            htmlFor="imageInput"
          >
            <i class="fa-solid fa-camera-retro fa-bounce fa-lg " style={{ color: "#ffff" }}></i>

          </label>
          <input
            type="file"
            id="imageInput"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <div className="user-details mt-4">
          <p className="text-2xl font-semibold mx-8">{userName}</p>
          <p className="text-2xl text-gray-600 mx-8">{getEmail}</p>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mx-9"
          onClick={handleSetLocation}
        >
          <i class="fa-solid fa-location-dot fa-xl"></i>
          Set Location
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={() => console.log("Edit Profile")}
        >
          <i className="fa-solid fa-pen-to-square fa-2xl" style={{ color: "#ffff" }}></i>
          Edit Profile
        </button>

      </div>

      {/* Right Column */}
      <div className="w-2/3 p-8 bg-gray-200">
            
      <Link to="/chat">
        <button className="bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded mx-0">
        <i class="fa-brands fa-facebook-messenger fa-xl "></i>
          
        </button>
      </Link>
        <div className="mb-8">

      
          <p className="text-2xl font-semibold">Profile Information</p>
          <hr className="border-t border-gray-500 my-2" />
          <p className="text-lg">User Type: {userType}</p>
          <p className="text-lg">Address: {address}</p>
          {userType === "admin" ? (
            <h1>Admin Page</h1>
            
          ) : (
            <div>
               <div>
              <p className="text-lg">Total Sales: {amount}</p>
              <p className="text-lg">Seller Ratings: {rating}</p>
            </div>
              <p className="text-lg">Total Buying Amount: {amount}</p>
              <p className="text-lg">Customer Rating: {rating}</p>
            </div>
          )}
        </div>

        {/* Profile Buttons */}
        <div className="flex justify-between items-center">
          <div className="space-x-2">
       
            
            {userType === "user" && (
              <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
             onClick={handleTransactions}
            >
              See Transactions
            </button> 
            )}
               {userType === "user" && (
              <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
             onClick={handleCheckOrders}
            >
              CheckOrders
            </button> 
            )}
             {userType === "admin" && (
              <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
             onClick={handleRequest}
            >
              Requests
            </button> 
            
            )}
            {userType === "admin" && (
              <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
             onClick={navigateToDash}
            >
             Dashboard
            </button> 
            
            )}

           
          </div>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            onClick={LogOut2}
          >
            <i className="fa-solid fa-right-from-bracket fa-bounce fa-lg" style={{ color: "#ff" }}></i>
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
