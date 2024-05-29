import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { useAuth } from '../Context/context';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { LogOut, user } = useAuth();
  const getEmail = localStorage.getItem('emailData');
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState('');
  const [uemail, setUmail] = useState(getEmail);
  //const [userType, setUserType] = useState(''); 
  const [address, setAddress] = useState('');
  const [phone,setPhone] = useState('');
  //const [amount, setAmount] = useState('');
  const [rating, setRating] = useState('');
  const [userName, setUserName] = useState('');
  const [lat,setLat]= useState('');
  const [long,setLong] = useState('');
  const loc=useLocation();

  useEffect(() => {
    fetchProfileImage(loc.state.em);
  }, [loc.state.em]);

  const LogOut2 = () => {
    LogOut();
    navigate('/Home');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('email', loc.state.em);
    console.log(loc.state.em);
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

  const openInGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps?q=${lat},${long}`;
    window.open(mapsUrl, '_blank');
  };

  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(`/getProfileImageName?email=${loc.state.em}`);
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
      const response = await axios.get(`/getProfile?email=${loc.state.em}`);
      if (response.data.user) {
        setAddress(response.data.user.address);
        setUserName(response.data.user.username);
        setRating(response.data.user.rating);
        setPhone(response.data.user.phone)
        setLat(response.data.user.Latitude);
        setLong(response.data.user.Longitude)
        
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, [getEmail, loc.state.em]);

  useEffect(() => {
    fetchProfile();
  }, []);
 console.log(lat,long);
  return (
    <div className="profile-container">
      <div className="left-column">
        <div className="profile-pic">
          <img src={profileImage} alt="Profile" onClick={() => console.log('Clicked on profile picture')} />
          {/* <label className="custom-file-upload">
  <input type="file" id="imageInput" name="image" accept="image/*" onChange={handleImageUpload} />
  Choose a Profile Image
</label> */}

        </div>
        <div className="user-details">
          <p>Seller Name: {userName}</p>
          <p>Email Address: {loc.state.em}</p>
          <p>Contact Number: {phone}</p>
        </div>
        <button className="set-location-button" onClick={openInGoogleMaps}>
          Get Location
        </button>
      </div>
      <div className="right-column">
        {/* <p>User Type: {userType}</p> */}
        <p>Address: {address}</p>
        <p>Seller Ratings: {rating}</p>
        {/* <div className="profile-buttons">
          <button className="edit-profile-button" onClick={() => console.log('Edit Profile')}>
            <i className="fa-solid fa-pen-to-square fa-2xl" style={{ color: '#0d5e21' }}></i>
            Edit Profile
          </button>
          <button className="logout-button" onClick={LogOut2}>
            <i className="fa-solid fa-right-from-bracket fa-bounce fa-lg" style={{ color: '#0d5e21' }}></i>LogOut
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default UserProfile;
